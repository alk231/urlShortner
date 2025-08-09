import { useState } from "react";

export default function UrlForm({ onShorten }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });

      if (!res.ok) throw new Error("Failed to shorten URL");

      const data = await res.json();
      setShortUrl(data.shortUrl);
      setLongUrl(""); // clear input
      onShorten(); // refresh admin table
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {shortUrl && (
        <p className="mt-4">
          Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
