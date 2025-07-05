import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PresenceMonitoringReport } from './PracticeSession';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { 
  Camera, 
  CameraOff, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Shield, 
  ShieldOff,
  Brain,
  Activity,
  BarChart3,
  LineChart ,
  NotebookPen
} from 'lucide-react';
import toast from 'react-hot-toast';

const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm font-medium mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className={`h-full rounded ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const Metric = ({ label, value }: { label: string; value: number | string }) => (
  <div className="flex justify-between py-1 border-b border-gray-200 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);
interface AdvancedCameraProctorProps {
  isEnabled: boolean;
  onCameraReady: (isReady: boolean) => void;
  onViolation: (type: 'face_not_detected' | 'multiple_faces' | 'looking_away' | 'face_obscured' | 'suspicious_movement') => void;
  onFaceReport?: (report: PresenceMonitoringReport) => void;
}

interface FaceMetrics {
  faceCount: number;
  eyeAspectRatio: number;
  headPose: {
    yaw: number;
    pitch: number;
    roll: number;
  };
  faceSize: number;
  confidence: number;
  expressions?: any;
}

// interface FaceMonitoringReport {
//   sessionDuration: number;
//   totalDetections: number;
//   averageConfidence: number;
//   faceDetectionRate: number;
//   violations: {
//     faceNotDetected: number;
//     multipleFaces: number;
//     lookingAway: number;
//     faceObscured: number;
//     suspiciousMovement: number;
//   };
//   headPoseStats: {
//     averageYaw: number;
//     averagePitch: number;
//     averageRoll: number;
//     maxYawDeviation: number;
//     maxPitchDeviation: number;
//   };
//   eyeMovementStats: {
//     averageEAR: number;
//     blinkCount: number;
//     blinkRate: number;
//   };
//   attentionScore: number;
//   stabilityScore: number;
//   overallScore: number;
//   recommendations: string[];
// }

export const AdvancedCameraProctor: React.FC<AdvancedCameraProctorProps> = ({
  isEnabled,
  onCameraReady,
  onViolation,
  onFaceReport,
}) => {
  const [cocoModel, setCocoModel] = useState<any>(null);
  const webcamRef = useRef<Webcam>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout>();
  
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [modelLoadingProgress, setModelLoadingProgress] = useState('');
  const [faceMetrics, setFaceMetrics] = useState<FaceMetrics>({
    faceCount: 0,
    eyeAspectRatio: 0,
    headPose: { yaw: 0, pitch: 0, roll: 0 },
    faceSize: 0,
    confidence: 0
  });
  const [violations, setViolations] = useState<Array<{type: string, time: string, severity: 'low' | 'medium' | 'high'}>>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastViolationTime, setLastViolationTime] = useState(0);
  const [suspiciousMovementCount, setSuspiciousMovementCount] = useState(0);
  const [lastFacePosition, setLastFacePosition] = useState<{x: number, y: number} | null>(null);
  const [IsReportReady, setIsReportReady] = useState(false)
  // Face monitoring statistics
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [detectionHistory, setDetectionHistory] = useState<Array<{
    timestamp: number;
    faceCount: number;
    confidence: number;
    headPose: { yaw: number; pitch: number; roll: number };
    eyeAspectRatio: number;
  }>>([]);
  const [blinkHistory, setBlinkHistory] = useState<number[]>([]);
  const [modelLoadAttempts, setModelLoadAttempts] = useState(0);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);

  const lookTimeRef = useRef(0);
  const [report, setReport] = useState<PresenceMonitoringReport | null>(null)
  // Load face-api.js models with better error handling and retry mechanism
  const loadModels = useCallback(async () => {
    try {
      console.log('🤖 Loading face-api.js models... Attempt:', modelLoadAttempts + 1);
      setModelLoadingProgress('Initializing Face-API.js...');
      setModelLoadError(null);
      
      // Use multiple CDN sources for better reliability
      // const modelUrls = [
      //   '/models', // Try local models first (in public/models)
      //   'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model',
      //   'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights',
      //   'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
      // ];
      
      let modelsLoadedSuccessfully = false;
      
      // for (const modelUrl of modelUrls) {
        try {
    
          
          // Set a timeout for model loading
          const loadPromise = Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models")
          ]);
          
          // Create a timeout promise
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Model loading timed out')), 15000);
          });
          
          // Race between loading and timeout
          await Promise.race([loadPromise, timeoutPromise]);
          
          console.log(`✅ Models loaded successfully from: local models`);
          modelsLoadedSuccessfully = true;
        } catch (error) {
          console.warn(`⚠️ Failed to load from local models:`, error);
        }
    
      
      if (!modelsLoadedSuccessfully) {
        throw new Error('Failed to load models from all sources');
      }
      
      setModelLoadingProgress('Models loaded successfully!');
      setModelsLoaded(true);
      toast.success('🧠 Face-API.js models loaded successfully');
    } catch (error: any) {
      console.error('❌ Error loading face-api.js models:', error);
      setModelLoadingProgress('Failed to load models');
      setModelLoadError(error.message || 'Unknown error loading models');
      
      // Retry loading if under max attempts
      if (modelLoadAttempts < 2) {
        setModelLoadAttempts(prev => prev + 1);
        setTimeout(() => loadModels(), 3000); // Retry after 3 seconds
      } else {
        toast.error('Failed to load face detection models. Using basic mode instead.');
        // Notify parent that camera is ready but models failed
        onCameraReady(true);
      }
    }
  }, [modelLoadAttempts, onCameraReady]);

  // Helper function for distance calculation
  const distance = (point1: any, point2: any): number => {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  };

  // Calculate eye aspect ratio for blink detection
  const calculateEyeAspectRatio = useCallback((eyeLandmarks: any[]) => {
    if (eyeLandmarks.length < 6) return 0;
    
    const vertical1 = distance(eyeLandmarks[1], eyeLandmarks[5]);
    const vertical2 = distance(eyeLandmarks[2], eyeLandmarks[4]);
    const horizontal = distance(eyeLandmarks[0], eyeLandmarks[3]);
    
    return (vertical1 + vertical2) / (2 * horizontal);
  }, []);

  // Calculate head pose angles
  const calculateHeadPoseFromLandmarks = useCallback((nose: any, leftEye: any, rightEye: any, jawLine: any) => {
    try {
      const noseTip = nose[3] || nose[4];
      const leftEyeCenter = leftEye[3] || leftEye[0];
      const rightEyeCenter = rightEye[3] || rightEye[0];
      const chin = jawLine[8];
      
      if (!noseTip || !leftEyeCenter || !rightEyeCenter || !chin) {
        return { yaw: 0, pitch: 0, roll: 0 };
      }
      
      // Calculate reference points
      const eyeCenter = {
        x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
        y: (leftEyeCenter.y + rightEyeCenter.y) / 2
      };
      
      const faceWidth = Math.abs(rightEyeCenter.x - leftEyeCenter.x);
      const faceHeight = Math.abs(chin.y - eyeCenter.y);
      
      // YAW calculation (horizontal head turn)
      const noseHorizontalOffset = noseTip.x - eyeCenter.x;
      const yawRatio = noseHorizontalOffset / faceWidth;
      const yaw = yawRatio * 60; // Scale to realistic range
      
      // PITCH calculation (vertical head tilt)
      const noseVerticalOffset = noseTip.y - eyeCenter.y;
      const pitchRatio = noseVerticalOffset / faceHeight;
      const pitch = pitchRatio * 40; // Scale to realistic range
      
      // ROLL calculation (head rotation)
      const eyeVector = {
        x: rightEyeCenter.x - leftEyeCenter.x,
        y: rightEyeCenter.y - leftEyeCenter.y
      };
      const roll = Math.atan2(eyeVector.y, eyeVector.x) * (180 / Math.PI);
      
      // Apply realistic limits and smoothing
      const clampedYaw = Math.max(-60, Math.min(60, yaw));
      const clampedPitch = Math.max(-40, Math.min(40, pitch));
      const clampedRoll = Math.max(-30, Math.min(30, roll));
      
      return { 
        yaw: parseFloat(clampedYaw.toFixed(1)), 
        pitch: parseFloat(clampedPitch.toFixed(1)), 
        roll: parseFloat(clampedRoll.toFixed(1))
      };
      
    } catch (error) {
      console.warn('Error calculating head pose:', error);
      return { yaw: 0, pitch: 0, roll: 0 };
    }
  }, []);
  // Process face-api.js detections
  const processFaceAPIDetections = useCallback((detections: any[]) => {
    try {
      const detection = detections[0]; // Focus on primary face
      const landmarks = detection.landmarks;
      const box = detection.detection.box;
      // Calculate eye aspect ratio
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const leftEAR = calculateEyeAspectRatio(leftEye);
      const rightEAR = calculateEyeAspectRatio(rightEye);
      const eyeAspectRatio = (leftEAR + rightEAR) / 2;

      // Calculate head pose
      const nose = landmarks.getNose();
      const jawLine = landmarks.getJawOutline();
      const headPose = calculateHeadPoseFromLandmarks(nose, leftEye, rightEye, jawLine);

      // Calculate face size
      const faceSize = Math.sqrt(box.width * box.height);
      
      return {
        faceCount: detections.length,
        eyeAspectRatio,
        headPose,
        faceSize,
        confidence: detection.detection.score,
        expressions: detection.expressions
      };
    } catch (error) {
      console.warn('Error processing face detections:', error);
      return {
        faceCount: detections.length,
        eyeAspectRatio: 0,
        headPose: { yaw: 0, pitch: 0, roll: 0 },
        faceSize: 0,
        confidence: detections[0]?.detection?.score || 0,
        expressions: null
      };
    }
  }, [calculateEyeAspectRatio, calculateHeadPoseFromLandmarks]);

  // Enhanced face detection with better error handling
  const detectFacesWithFaceAPI = useCallback(async () => {
    if (!webcamRef.current || !modelsLoaded) return;

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) return;

    try {
      // Use TinyFaceDetector with optimized options
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
          inputSize: 320, // Reduced from 416 for better performance
          scoreThreshold: 0.4 // Reduced from 0.5 for better detection
        }))
        .withFaceLandmarks()
        .withFaceExpressions();

      console.log(`🔍 Face detection result: ${detections.length} face(s) detected`);
        // toast.success(""+detections[0])
      // Update overlay canvas
      if(sessionStartTime==0) setSessionStartTime(Math.floor(Date.now()))
      if (overlayCanvasRef.current) {
        const canvas = overlayCanvasRef.current;
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        
        // Ensure canvas matches video dimensions
        if (canvas.width !== displaySize.width || canvas.height !== displaySize.height) {
          faceapi.matchDimensions(canvas, displaySize);
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        // Clear previous drawings
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          if (detections.length > 0) {
            // Draw face detection boxes and landmarks
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            
            // Draw custom overlay for better visibility
            resizedDetections.forEach((detection, index) => {
              const box = detection.detection.box;
              
              // Draw confidence score
              ctx.fillStyle = '#00ff00';
              ctx.font = 'bold 16px Arial';
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 3;
              ctx.strokeText(`Face ${index + 1}: ${(detection.detection.score * 100).toFixed(1)}%`, 
                            box.x, box.y - 10);
              ctx.fillText(`Face ${index + 1}: ${(detection.detection.score * 100).toFixed(1)}%`, 
                          box.x, box.y - 10);
            });
          }
        }
      }

      // Process detections and update metrics
      if (detections.length > 0) {
        const faceMetrics = processFaceAPIDetections(detections);
        setFaceMetrics(faceMetrics);
        lookTimeRef.current=lookTimeRef.current+1;
        // Record detection data for report
        const timestamp = Date.now();
        setDetectionHistory(prev => [...prev.slice(-100), { // Keep last 100 detections
          timestamp,
          faceCount: faceMetrics.faceCount,
          confidence: faceMetrics.confidence,
          headPose: faceMetrics.headPose,
          eyeAspectRatio: faceMetrics.eyeAspectRatio
        }]);

        // Detect blinks
        if (faceMetrics.eyeAspectRatio > 0 && faceMetrics.eyeAspectRatio < 0.25) {
          setBlinkHistory(prev => [...prev.slice(-50), timestamp]); // Keep last 50 blinks
        }

        checkFaceAPIViolations(detections);
        detectDevices(video)
      } else {
        setFaceMetrics(prev => ({ ...prev, faceCount: 0, confidence: 0 }));
        handleViolation('face_not_detected', 'high');
      }
    } catch (error) {
      console.error('❌ Face detection error:', error);
      // Don't throw error, just log it to prevent breaking the detection loop
    }
  }, [modelsLoaded, processFaceAPIDetections,faceMetrics]);

  // Check violations for face-api.js
  const checkFaceAPIViolations = useCallback((detections: any[]) => {
    const now = Date.now();
    console.log("now processing",faceMetrics)
    // Multiple faces
    if (detections.length > 1) {
      handleViolation('multiple_faces', 'high');
    }

    // Looking away (head pose)
    if (detections.length > 0) {
      const { yaw, pitch } = faceMetrics.headPose;
      if (Math.abs(yaw) > 15 || (pitch<5 || pitch > 20)) {
        handleViolation('looking_away', 'medium');
      }

      // Face too small (moved away from camera)
      if (faceMetrics.faceSize < 200) {
        handleViolation('face_obscured', 'medium');
      }

      // Suspicious movement detection
      const currentPosition = { x: detections[0].detection.box.x, y: detections[0].detection.box.y };
      if (lastFacePosition) {
        const movement = Math.sqrt(
          Math.pow(currentPosition.x - lastFacePosition.x, 2) + 
          Math.pow(currentPosition.y - lastFacePosition.y, 2)
        );
        
        if (movement > 50) {
          setSuspiciousMovementCount(prev => prev + 1);
          if (suspiciousMovementCount > 5) {
            handleViolation('suspicious_movement', 'low');
            setSuspiciousMovementCount(0);
          }
        }
      }
      setLastFacePosition(currentPosition);
    }
  }, [faceMetrics.headPose, faceMetrics.faceSize, lastFacePosition, suspiciousMovementCount]);

  // Handle violations with severity levels
  const handleViolation = useCallback((type: string, severity: 'low' | 'medium' | 'high') => {
    const now = Date.now();
    
    // Rate limiting based on severity
    const cooldownTime = severity === 'high' ? 2000 : severity === 'medium' ? 5000 : 10000;
    
    if (now - lastViolationTime < cooldownTime) return;
    
    setLastViolationTime(now);
    onViolation(type as any);
    
    const violation = {
      type,
      time: new Date().toLocaleTimeString(),
      severity
    };
    
    setViolations(prev => [...prev.slice(-9), violation]); // Keep last 10 violations
    
    // Different toast messages based on severity
    const messages = {
      face_not_detected: {
        high: '🚨 Face not detected - Please position yourself in front of the camera',
        medium: '⚠️ Face partially visible',
        low: 'ℹ️ Face detection unstable'
      },
      multiple_faces: {
        high: '🚨 Multiple faces detected - Ensure you are alone',
        medium: '⚠️ Additional person detected',
        low: 'ℹ️ Multiple face regions detected'
      },
      looking_away: {
        high: '🚨 Looking away from camera',
        medium: '⚠️ Please look at the camera',
        low: 'ℹ️ Head movement detected'
      },
      face_obscured: {
        high: '🚨 Face obscured or too far from camera',
        medium: '⚠️ Move closer to the camera',
        low: 'ℹ️ Face partially obscured'
      },
      suspicious_movement: {
        high: '🚨 Excessive movement detected',
        medium: '⚠️ Please remain still',
        low: 'ℹ️ Movement detected'
      }
    };

    const message = messages[type as keyof typeof messages]?.[severity] || 'Proctoring violation detected';
    
    if (severity === 'high') {
      toast.error(message);
    } else if (severity === 'medium') {
      toast(message, { icon: '⚠️' });
      
    }
  }, [lastViolationTime, onViolation]);

  // Generate comprehensive face monitoring report
  const generateFaceReport = useCallback((): PresenceMonitoringReport => {
    const sessionDuration = (Date.now() - sessionStartTime) / 1000; // in seconds
    const totalDetections = detectionHistory.length;
    
    if (totalDetections === 0) {
      return {
        sessionDuration,
        totalDetections: 0,
        averageConfidence: 0,
        faceDetectionRate: 0,
        violations: {
          faceNotDetected: violations.filter(v => v.type === 'face_not_detected').length,
          multipleFaces: violations.filter(v => v.type === 'multiple_faces').length,
          lookingAway: violations.filter(v => v.type === 'looking_away').length,
          faceObscured: violations.filter(v => v.type === 'face_obscured').length,
          suspiciousMovement: violations.filter(v => v.type === 'suspicious_movement').length,
        },
        headPoseStats: {
          averageYaw: 0,
          averagePitch: 0,
          averageRoll: 0,
          maxYawDeviation: 0,
          maxPitchDeviation: 0,
        },
        eyeMovementStats: {
          averageEAR: 0,
          blinkCount: 0,
          blinkRate: 0,
        },
        attentionScore: 0,
        stabilityScore: 0,
        overallScore: 0,
        presenceRate: 0,
        recommendations: ['No face data collected during session']
      };
    }

    // Calculate statistics
    const averageConfidence = detectionHistory.reduce((sum, d) => sum + d.confidence, 0) / totalDetections;
    const faceDetectionRate = (detectionHistory.filter(d => d.faceCount > 0).length / totalDetections) * 100;
    
    // Head pose statistics
    const yawValues = detectionHistory.map(d => d.headPose.yaw);
    const pitchValues = detectionHistory.map(d => d.headPose.pitch);
    const rollValues = detectionHistory.map(d => d.headPose.roll);
    
    const averageYaw = yawValues.reduce((sum, val) => sum + val, 0) / yawValues.length;
    const averagePitch = pitchValues.reduce((sum, val) => sum + val, 0) / pitchValues.length;
    const averageRoll = rollValues.reduce((sum, val) => sum + val, 0) / rollValues.length;
    
    const maxYawDeviation = Math.max(...yawValues.map(val => Math.abs(val)));
    const maxPitchDeviation = Math.max(...pitchValues.map(val => Math.abs(val)));
    
    // Eye movement statistics
    const earValues = detectionHistory.map(d => d.eyeAspectRatio).filter(ear => ear > 0);
    const averageEAR = earValues.length > 0 ? earValues.reduce((sum, val) => sum + val, 0) / earValues.length : 0;
    const blinkCount = blinkHistory.length;
    const blinkRate = sessionDuration > 0 ? (blinkCount / sessionDuration) * 60 : 0; // blinks per minute
    
    // Calculate scores
    const attentionScore = Math.max(0, Math.min(100, 
      100 - (maxYawDeviation * 2) - (maxPitchDeviation * 2) - (violations.filter(v => v.type === 'looking_away').length * 10)
    ));
    
    const stabilityScore = Math.max(0, Math.min(100,
      faceDetectionRate - (violations.filter(v => v.type === 'face_not_detected').length * 5)
    ));
    
    const overallScore = (attentionScore + stabilityScore + (averageConfidence * 100)) / 3;
    //Calculate how long the presence was recorded
    const presenceRate=Number(((lookTimeRef.current/sessionDuration)*100).toFixed(2))
    // Generate recommendations
    const recommendations: string[] = [];
    if (faceDetectionRate < 90) recommendations.push('Improve camera positioning for better face detection');
    if (maxYawDeviation > 20) recommendations.push('Try to keep your head facing forward');
    if (maxPitchDeviation > 15) recommendations.push('Maintain eye level with the camera');
    if (blinkRate < 10) recommendations.push('Remember to blink naturally');
    if (blinkRate > 30) recommendations.push('Reduce excessive blinking');
    if (violations.filter(v => v.type === 'multiple_faces').length > 0) recommendations.push('Ensure you are alone during the session');
    if (averageConfidence < 0.7) recommendations.push('Improve lighting conditions for better detection');
    
    if (recommendations.length === 0) {
      recommendations.push('Excellent monitoring session! Your behavior was professional and consistent.');
    }

    return {
      sessionDuration,
      totalDetections,
      averageConfidence,
      faceDetectionRate,
      violations: {
        faceNotDetected: violations.filter(v => v.type === 'face_not_detected').length,
        multipleFaces: violations.filter(v => v.type === 'multiple_faces').length,
        lookingAway: violations.filter(v => v.type === 'looking_away').length,
        faceObscured: violations.filter(v => v.type === 'face_obscured').length,
        suspiciousMovement: violations.filter(v => v.type === 'suspicious_movement').length,
      },
      headPoseStats: {
        averageYaw,
        averagePitch,
        averageRoll,
        maxYawDeviation,
        maxPitchDeviation,
      },
      eyeMovementStats: {
        averageEAR,
        blinkCount,
        blinkRate,
      },
      attentionScore,
      stabilityScore,
      overallScore,
      presenceRate:presenceRate>100?100:presenceRate,
      recommendations
    };
  }, [sessionStartTime, detectionHistory, violations, blinkHistory]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (!isEnabled || !modelsLoaded) return;
    
    console.log('🚀 Starting Face-API.js monitoring...');
    setIsMonitoring(true);

    if(detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
    const interval = setInterval(detectFacesWithFaceAPI, 1000); // Every 1 second for better performance
    detectionIntervalRef.current = interval;

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [isEnabled, modelsLoaded, detectFacesWithFaceAPI, isMonitoring]);

  // Stop monitoring and generate report
  const stopMonitoring = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);    
    }
    overlayCanvasRef.current?.getContext("2d")?.reset()
    if (isMonitoring && onFaceReport) {
      // const report = generateFaceReport(); 
      setReport(generateFaceReport())   
      if (report) onFaceReport(report);
    }
    // if(webcamRef.current?.video)webcamRef.current.video = null;
    const stream = webcamRef.current?.video?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // ✅ Stop camera
    }
    if (webcamRef.current?.video) {
      webcamRef.current.video.srcObject = null;
    }
    // const videoTrack = webcamRef.current?.stream?.getTracks()
    // if(videoTrack) {videoTrack.forEach(track=>track.stop())}
   
    // if(webcamRef.current?.video) webcamRef.current.video.srcObject=null
        // stops webcam
    setSessionStartTime(0)
    setIsMonitoring(false);
    setIsReportReady(true);
    lookTimeRef.current=0

  }, [isMonitoring, generateFaceReport, onFaceReport, IsReportReady]);

  useEffect(() => {
    if (isEnabled) {
      loadModels();
    }
    
    // return () => {
    //   stopMonitoring();
    // };
  }, [isEnabled]);

  useEffect(() => {
    if (modelsLoaded && isEnabled) {
      startMonitoring();
    }
    
    // return () => {
    //   stopMonitoring();
    // };
  }, [modelsLoaded, isEnabled, startMonitoring]);

 ;

  const requestCameraPermission = async () => {
   
    try {

    setSessionStartTime(Date.now());
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false
    });
    if (webcamRef.current && webcamRef.current.video) {
      webcamRef.current.video.srcObject = stream;
    }
        
      setCameraPermission("granted");
      setIsMonitoring(true)
      onCameraReady(true);
      toast.success('📹 Camera access granted - Face-API.js proctoring active');
 
   
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error('Camera access is required for face monitoring'+err);
    setCameraPermission('denied');
      onCameraReady(false);
    }
  };

  const handleUserMedia = () => {
    setCameraPermission('granted');
    onCameraReady(true);
  };

  const handleUserMediaError = (error: string | DOMException) => {
    console.error('Camera error:', error);
    setCameraPermission('denied');
    onCameraReady(false);
    toast.error('Failed to access camera. Please check permissions.');
  };
  useEffect(() => {
    cocoSsd.load().then(setCocoModel);
  }, []);

  const detectDevices = async (video: HTMLVideoElement) => {
    if (!cocoModel || !video) return;
    const predictions = await cocoModel.detect(video);
    console.log('COCO-SSD predictions:', predictions); // Debug: See what objects are detected
    // Make detection case-insensitive and more robust
    const deviceDetected = predictions.some((pred: { class: string }) =>
      ['cell phone', 'laptop', 'tv', 'monitor', 'remote', 'keyboard', 'mouse', 'tablet', 'computer'].some(device =>
        pred.class && pred.class.toLowerCase().includes(device)
      )
    );
    if (deviceDetected) {
      handleViolation('electronic_device_detected', 'high');
    }
  };

useEffect(() => {
  return ()=>{   const stream = webcamRef.current?.video?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // ✅ Stop camera
    }
    if (webcamRef.current?.video) {
      webcamRef.current.video.srcObject = null;
    }}
}, [])

  if (!isEnabled) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-colors duration-200">
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 transition-colors duration-200">
          <CameraOff className="h-5 w-5" />
          <span className="text-sm">Face monitoring is disabled</span>
        </div>
      </div>
    );
  }

  if (cameraPermission === 'pending') {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 transition-colors duration-200">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Face-API.js Monitoring</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-200">
            Enable camera access for advanced face detection and behavioral analysis using Face-API.js.
          </p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 text-sm transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white transition-colors duration-200">Face-API.js Features:</span>
            </div>
            <ul className="text-left text-gray-600 dark:text-gray-400 space-y-1 transition-colors duration-200">
              <li>• Real-time face detection and tracking</li>
              <li>• Head pose estimation (yaw, pitch, roll)</li>
              <li>• Eye movement and blink detection</li>
              <li>• Facial expression analysis</li>
              <li>• Comprehensive monitoring report</li>
            </ul>
          </div>
          <button
            onClick={requestCameraPermission}
            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Enable Face-API.js Monitoring
          </button>
        </div>
      </div>
    );
  }

  if (cameraPermission === 'denied') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6 transition-colors duration-200">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Camera Access Required</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-200">
            Face monitoring requires camera access. Please enable permissions and refresh.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 dark:bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isMonitoring ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'} transition-colors duration-200`}>
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">Face-API.js Monitoring</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
              {!modelsLoaded ? modelLoadingProgress : 
               isMonitoring ? 'Advanced face monitoring active' : 
               'Setting up monitoring...'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Detection Method</div>
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200">Face-API.js</div>
          </div>
          
          {faceMetrics.faceCount > 0 && !IsReportReady? (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 transition-colors duration-200">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">
                {faceMetrics.faceCount} Face{faceMetrics.faceCount > 1 ? 's' : ''} Detected
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-red-600 dark:text-red-400 transition-colors duration-200">
              <EyeOff className="h-4 w-4" />
              <span className="text-sm font-medium">No Face</span>
            </div>
          )}
        </div>
      </div>

      {/* Model Loading Error */}
      {modelLoadError && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-medium">Model loading issue: {modelLoadError}</p>
              <p>Using basic detection mode instead. Monitoring will continue.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed with Overlay */}
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              audio={false}
              width={640}
              height={480}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: 'user',
              }}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              className="w-full h-auto"
              mirrored={true} // Mirror the video for more intuitive experience
            />
            
            {/* Face-API.js Detection Overlay */}
            <canvas
              ref={overlayCanvasRef}
              className="absolute top-0 left-0 w-full h-full"
              width={640}
              height={480}
            />
            
            
            {/* Status Overlays */}
            {!IsReportReady && (<>
            <div className="absolute top-2 left-2 space-y-1">
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                faceMetrics.faceCount === 1 ? 'bg-green-500 text-white' : 
                faceMetrics.faceCount > 1 ? 'bg-yellow-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {faceMetrics.faceCount === 0 ? '⚠ No Face' : 
                 faceMetrics.faceCount === 1 ? '✓ Face Detected' : 
                 `⚠ ${faceMetrics.faceCount} Faces`}
              </div>
              
              {faceMetrics.confidence > 0 && (
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Confidence: {(faceMetrics.confidence * 100).toFixed(0)}%
                </div>
              )}
            </div>
              
            {/* Recording indicator */}
            
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>MONITORING</span>
              </div>
           

            {/* Head Pose Indicator */}
            {faceMetrics.faceCount > 0 && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Yaw: {faceMetrics.headPose.yaw.toFixed(1)}° | 
                Pitch: {faceMetrics.headPose.pitch.toFixed(1)}° | 
                Roll: {faceMetrics.headPose.roll.toFixed(1)}°
              </div>
            )}

            {/* Blink Detection */}
            {faceMetrics.eyeAspectRatio > 0 && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                EAR: {faceMetrics.eyeAspectRatio.toFixed(3)} | 
                Blinks: {blinkHistory.length}
              </div>
            )}
            </>)}
          </div>
         
          {IsReportReady && report? (<>
          <button onClick={()=>{requestCameraPermission();setIsReportReady(false)}} className="text-xl text-white font-bold w-1/2 py-2 rounded-full mt-2 bg-green-800 shadow-black shadow-md hover:bg-green-600">Start new Session</button>          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className='flex gap-2'>
            <BarChart3/>
        <h2 className="text-xl font-bold mb-4">Session Summary</h2>
        </div>
        <Metric label="Session Duration" value={`${report.sessionDuration} sec`} />
        <Metric label="Total Detections" value={report.totalDetections} />
        <Metric label="Average Confidence" value={report.averageConfidence.toFixed(2)} />
        <Metric label="Face Detection Rate" value={`${report.faceDetectionRate}%`} />
        <Metric label="Presence Rate" value={`${report.presenceRate}%`} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className='flex gap-2'>
        <AlertTriangle></AlertTriangle>
        <h2 className="text-xl font-bold mb-4">Violations</h2>
        </div>
       
        {Object.entries(report.violations).map(([k, v]) => (
          <Metric key={k} label={k.replace(/([A-Z])/g, ' $1')} value={v} />
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className='flex gap-2'>
        <Brain></Brain>
        <h2 className="text-xl font-bold mb-4"> Head Pose Stats</h2>
        </div>
        {Object.entries(report.headPoseStats).map(([k, v]) => (
          <Metric key={k} label={k.replace(/([A-Z])/g, ' $1')} value={v.toFixed(2)} />
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="flex gap-2">
        <Eye></Eye>
        <h2 className="text-xl font-bold mb-4"> Eye Movement Stats</h2>
        </div>
        {Object.entries(report.eyeMovementStats).map(([k, v]) => (
          <Metric key={k} label={k.replace(/([A-Z])/g, ' $1')} value={v.toFixed(2)} />
        ))}
      </div>

      <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow-md">
        <div className="flex gap-2">
        <LineChart></LineChart>
        <h2 className="text-xl font-bold mb-4">Scores</h2>
        </div>
        <ScoreBar label="Attention Score" value={report.attentionScore} color="bg-blue-500" />
        <ScoreBar label="Stability Score" value={report.stabilityScore} color="bg-green-500" />
        <ScoreBar label="Overall Score" value={report.overallScore} color="bg-purple-500" />
      </div>

      <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow-md">
        <div className="flex gape">
        <NotebookPen></NotebookPen>
        <h2 className="text-xl font-bold mb-4">Recommendations</h2>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {report.recommendations.map((rec: string, idx: number) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
            </>     
            )
          :<button onClick={stopMonitoring} className="text-xl text-white font-bold w-1/2 py-2 rounded-full mt-2 bg-red-800 shadow-black shadow-md hover:bg-red-600">Stop session</button>
        }         
          
        </div>

        {/* Monitoring Dashboard */}
        {!IsReportReady &&(
        <div className="space-y-4">
          {/* Face Detection Status */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-200">Face Detection Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Models Loaded:</span>
                <span className={`font-medium ${modelsLoaded ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'} transition-colors duration-200`}>
                  {modelsLoaded ? 'Yes' : 'Loading...'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Face Count:</span>
                <span className={`font-medium ${
                  faceMetrics.faceCount === 1 ? 'text-green-600 dark:text-green-400' : 
                  faceMetrics.faceCount > 1 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                } transition-colors duration-200`}>
                  {faceMetrics.faceCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Confidence:</span>
                <span className="font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200">
                  {(faceMetrics.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">Detections:</span>
                <span className="font-medium text-purple-600 dark:text-purple-400 transition-colors duration-200">
                  {detectionHistory.length}
                </span>
              </div>
            </div>
          </div>

          {/* Head Pose Analysis */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 transition-colors duration-200">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2 transition-colors duration-200">Head Pose Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-200 transition-colors duration-200">Yaw (Left/Right):</span>
                <span className={`font-medium ${Math.abs(faceMetrics.headPose.yaw) > 30 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} transition-colors duration-200`}>
                  {faceMetrics.headPose.yaw.toFixed(1)}°
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-200 transition-colors duration-200">Pitch (Up/Down):</span>
                <span className={`font-medium ${Math.abs(faceMetrics.headPose.pitch) > 25 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} transition-colors duration-200`}>
                  {faceMetrics.headPose.pitch.toFixed(1)}°
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-200 transition-colors duration-200">Roll (Tilt):</span>
                <span className="font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200">
                  {faceMetrics.headPose.roll.toFixed(1)}°
                </span>
              </div>
            </div>
          </div>

          {/* Eye Movement Analysis */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 transition-colors duration-200">
            <h4 className="font-medium text-green-900 dark:text-green-300 mb-2 transition-colors duration-200">Eye Movement</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-green-800 dark:text-green-200 transition-colors duration-200">Eye Aspect Ratio:</span>
                <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-200">
                  {faceMetrics.eyeAspectRatio.toFixed(3)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-800 dark:text-green-200 transition-colors duration-200">Blink Count:</span>
                <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-200">
                  {blinkHistory.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-800 dark:text-green-200 transition-colors duration-200">Blink Rate:</span>
                <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-200">
                  {sessionStartTime > 0 ? 
                    ((blinkHistory.length / ((Date.now() - sessionStartTime) / 1000)) * 60).toFixed(1) : 
                    '0.0'
                  } /min
                </span>
              </div>
            </div>
          </div>

          {/* Violations Log */}
          {violations.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 transition-colors duration-200">
              <h4 className="font-medium text-red-900 dark:text-red-300 mb-2 transition-colors duration-200">Recent Violations</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {violations.slice(-5).map((violation, index) => (
                  <div key={index} className={`text-xs p-2 rounded ${
                    violation.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                    violation.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  } transition-colors duration-200`}>
                    <div className="font-medium">{violation.type.replace('_', ' ').toUpperCase()}</div>
                    <div>{violation.time} - {violation.severity} severity</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Session Statistics */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4 transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <h4 className="font-medium text-purple-900 dark:text-purple-300 transition-colors duration-200">Session Stats</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-purple-800 dark:text-purple-200 transition-colors duration-200">Duration:</span>
                <span className="font-medium text-purple-600 dark:text-purple-400 transition-colors duration-200">
                  {sessionStartTime > 0 ? 
                    Math.floor((Date.now() - sessionStartTime) / 1000) : 
                    0
                  }s
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-800 dark:text-purple-200 transition-colors duration-200">Total Violations:</span>
                <span className="font-medium text-purple-600 dark:text-purple-400 transition-colors duration-200">
                  {violations.length}
                </span>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 transition-colors duration-200">
            <h4 className="font-medium text-green-900 dark:text-green-300 mb-2 transition-colors duration-200">Face-API.js Guidelines</h4>
            <ul className="text-xs text-green-800 dark:text-green-200 space-y-1 transition-colors duration-200">
              <li>• Keep your face clearly visible and centered</li>
              <li>• Look directly at the camera regularly</li>
              <li>• Avoid excessive head movements</li>
              <li>• Ensure you are alone in the frame</li>
              <li>• Maintain good lighting on your face</li>
              <li>• Blink naturally for best detection</li>
            </ul>
          </div>
        </div>)
        }
      </div>
    </div>
  );
};