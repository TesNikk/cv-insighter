import React, { useState } from "react";
import { useRouter } from "next/router";
const CVForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [],
    experience: [],
    skill: [],
    summary: "",
  });

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleListChange = (name: string, value: string, inputId: string) => {
    if (value.trim() === "") return;

    setFormData({
      ...formData,
      [name]: [...(formData[name as keyof typeof formData] as string[]), value],
    });

    (document.getElementById(inputId) as HTMLInputElement).value = "";
  };

  const handleRemoveItem = (name: string, index: number) => {
    setFormData({
      ...formData,
      [name]: (formData[name as keyof typeof formData] as string[]).filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit

    try {
      // Log the data being sent
      console.log("Submitting CV with data:", formData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to submit CV. Status: ${response.status}`);
      }

      // Optional: If response is JSON, you can parse it (if you need it)
      const data = await response.json();
      console.log("Submission successful:", data);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        education: [],
        experience: [],
        skill: [],
        summary: "",
      });
      router.push(`/review/${data.id}`);
    } catch (error) {
      console.error("Error submitting CV:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Your CV Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Education */}
        <div>
          <label className="block font-medium">Education</label>
          <div className="flex gap-2">
            <input
              type="text"
              id="educationInput"
              className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
              placeholder="Add education"
            />
            <button
              type="button"
              className="px-3 py-1 bg-black text-white rounded-md"
              onClick={() =>
                handleListChange(
                  "education",
                  (
                    document.getElementById(
                      "educationInput"
                    ) as HTMLInputElement
                  ).value,
                  "educationInput"
                )
              }
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {formData.education.map((edu, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-300 p-2 rounded-md my-1"
              >
                {edu}
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => handleRemoveItem("education", index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium">Experience</label>
          <div className="flex gap-2">
            <input
              type="text"
              id="experienceInput"
              className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
              placeholder="Add experience"
            />
            <button
              type="button"
              className="px-3 py-1 bg-black text-white rounded-md"
              onClick={() =>
                handleListChange(
                  "experience",
                  (
                    document.getElementById(
                      "experienceInput"
                    ) as HTMLInputElement
                  ).value,
                  "experienceInput"
                )
              }
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {formData.experience.map((exp, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-300 p-2 rounded-md my-1"
              >
                {exp}
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => handleRemoveItem("experience", index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* skill */}
        <div>
          <label className="block font-medium">skill</label>
          <div className="flex gap-2">
            <input
              type="text"
              id="skillInput"
              className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-100 text-black"
              placeholder="Add skill"
            />
            <button
              type="button"
              className="px-3 py-1 bg-black text-white rounded-md"
              onClick={() =>
                handleListChange(
                  "skill",
                  (document.getElementById("skillInput") as HTMLInputElement)
                    .value,
                  "skillInput"
                )
              }
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {formData.skill.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-300 p-2 rounded-md my-1"
              >
                {skill}
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => handleRemoveItem("skill", index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Summary */}
        <div>
          <label className="block font-medium">Profile Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
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
