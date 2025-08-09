// App.jsx
import { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import AdminPage from "./components/AdminPage";

export default function App() {
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin`);
    const data = await res.json();
    setUrls(data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <UrlForm onShorten={fetchUrls} />
      <AdminPage urls={urls} />
    </div>
  );
}
