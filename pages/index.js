import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = "fka_0hWHE9QuU87ThIiB88HrrYQMgPj8BNShJr";
    const encodedKey = btoa(apiKey + ":x");

    await fetch("https://api.followupboss.com/v1/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedKey}`,
      },
      body: JSON.stringify({
        firstName: formData.name,
        emails: [{ value: formData.email, type: "work" }],
        phones: [{ value: formData.phone, type: "mobile" }],
        tags: ["Billboard QR Lead"],
        source: "Billboard QR Code Funnel",
      }),
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        {!submitted ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
              Find Your Dream Home in SoCal
            </h1>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Scan the QR code from our billboard? You’re in the right place.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
                Claim My Free Gift
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">You’re All Set!</h2>
            <p className="text-gray-700 text-lg">
              Check your email and phone for your free gift details and consultation link.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
