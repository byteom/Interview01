import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import Fuse from "fuse.js";
import { searchIndex } from "../data/searchIndex";

const fuse = new Fuse(searchIndex, {
  keys: ["keywords", "title"],
  threshold: 0.3, // controls fuzzy tolerance
});

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const results = fuse.search(query);

    if (results.length > 0) {
      const bestMatch = results[0].item;
      navigate(bestMatch.url); // navigate to page/section
    } else {
      alert("No results found");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for study plans..."
        className="border rounded-lg px-3 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </form>
  );
}
