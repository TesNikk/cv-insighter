import React, { useState } from "react";

const CVForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    profileSummary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Call API to submit form data
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your CV</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
          />
        </div>

        {/* Experience Field */}
        <div>
          <label className="block font-medium">Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
          ></textarea>
        </div>

        {/* Skills Field */}
        <div>
          <label className="block font-medium">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
          ></textarea>
        </div>

        {/* Profile Summary Field */}
        <div>
          <label className="block font-medium">Profile Summary</label>
          <textarea
            name="profileSummary"
            value={formData.profileSummary}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            Submit CV
          </button>
        </div>
      </form>
    </div>
  );
};

export default CVForm;
