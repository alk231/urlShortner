import { useEffect, useState } from "react";

export default function AdminPage() {
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin");
      const data = await res.json();
      setUrls(data);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Admin Dashboard
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Short URL
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Original URL
              </th>
              <th className="border border-gray-200 px-4 py-2 text-center">
                Visit Count
              </th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-blue-600">
                  <a
                    href={`http://localhost:5000/${url.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {url.shortCode}
                  </a>
                </td>
                <td className="border border-gray-200 px-4 py-2 break-all text-gray-700">
                  {url.longUrl}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center font-semibold text-gray-800">
                  {url.visitCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
