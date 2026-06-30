import { useState } from "react";
import InfoCard from "../components/InfoCard";

function Webcontracts() {
  const role = localStorage.getItem("role");

  const canEdit =
    role === "admin" ||
    role === "ADMIN";

  const [formData, setFormData] = useState({
    websiteUrl: "",
    sslCertificateExpiryDate: "",
    hostingProvider: "",
    domainRenewalDate: "",
    domainRegister: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5000/api/admin/webcontracts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(formData),
        }
      );

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        setMessage(data.message || "Website details save failed");
        return;
      }

      setMessage("Website details saved successfully");
    } catch (error) {
      console.log(error);
      setMessage("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#06111f] border border-cyan-900 rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-2">
        Provide Your Website, Domain and Contract Details
      </h1>

      <p className="text-gray-400 mb-10">
        Website and domain management overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          label="Website URL"
          name="websiteUrl"
          value={formData.websiteUrl}
          canEdit={canEdit}
          onChange={handleChange}
        />

        <InfoCard
          label="SSL Certificate Expiry Date"
          name="sslCertificateExpiryDate"
          value={formData.sslCertificateExpiryDate}
          canEdit={canEdit}
          onChange={handleChange}
        />

        <InfoCard
          label="Hosting Provider"
          name="hostingProvider"
          value={formData.hostingProvider}
          canEdit={canEdit}
          onChange={handleChange}
        />

        <InfoCard
          label="Domain Renewal Date"
          name="domainRenewalDate"
          value={formData.domainRenewalDate}
          canEdit={canEdit}
          onChange={handleChange}
        />

        <InfoCard
          label="Domain Register"
          name="domainRegister"
          value={formData.domainRegister}
          canEdit={canEdit}
          onChange={handleChange}
        />
      </div>

      {message && (
        <p className="mt-5 text-sm text-[#00e8ad]">
          {message}
        </p>
      )}

      {canEdit && (
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="mt-8 rounded-lg bg-[#00e8ad] px-6 py-3 font-semibold text-[#06111f] transition-all duration-200 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      )}
    </div>
  );
}

export default Webcontracts;