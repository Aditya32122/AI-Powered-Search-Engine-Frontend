import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showFullResponse, setShowFullResponse] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://ai-powered-search-engine-production.up.railway.app/search/", { query_text: query });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">AI-Powered Search</h2>

      {/* Search Input */}
      <div className="flex w-full max-w-2xl space-x-3">
        <input
          type="text"
          placeholder="Enter a query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Display Results */}
      {results && (
        <div className="mt-8 w-full max-w-5xl space-y-6">

          {/* AI Response Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-600">AI Response</h3>
            <p className="mt-2 text-gray-700">
              {showFullResponse ? results.ai_response : `${results.ai_response.slice(0, 300)}...`}
            </p>
            {results.ai_response.length > 300 && (
              <button
                onClick={() => setShowFullResponse(!showFullResponse)}
                className="mt-2 text-purple-600 hover:underline"
              >
                {showFullResponse ? "Show Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Google Search Results */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-600">Google Search Results</h3>
            <ul className="mt-2 space-y-2">
              {results.google_results.length > 0 ? (
                results.google_results.map((item, index) => (
                  <li key={index} className="border-b border-gray-300 pb-2">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                      {item.title}
                    </a>
                    <p className="text-gray-600 text-sm">{item.snippet}</p>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No results found</li>
              )}
            </ul>
          </div>

          {/* YouTube Results */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-600">YouTube Videos</h3>
            <ul className="mt-2 space-y-2">
              {results.youtube_results.length > 0 ? (
                results.youtube_results.map((item, index) => (
                  <li key={index} className="border-b border-gray-300 pb-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                      {item.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No videos found</li>
              )}
            </ul>
          </div>

          {/* News Results */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-600">Latest News</h3>
            <ul className="mt-2 space-y-2">
              {results.news_results.length > 0 ? (
                results.news_results.map((item, index) => (
                  <li key={index} className="border-b border-gray-300 pb-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                      {item.title}
                    </a>
                    <p className="text-gray-600 text-sm">
                      {item.source} - {item.description}
                    </p>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No news articles found</li>
              )}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default Search;
