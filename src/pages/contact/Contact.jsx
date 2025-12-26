"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#658C58] mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-black text-center mb-12 max-w-2xl">
        Have questions, feedback, or need assistance? Reach out to us and we
        will get back to you as soon as possible.
      </p>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-16 w-full max-w-6xl">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2 text-[#658C58]">Email</h2>
          <p className="text-black font-semibold"> support@rivorent.com</p>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2 text-[#658C58]">Phone</h2>
          <p className="text-black font-semibold">(845) 576-9038</p>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2 text-[#658C58]">Address</h2>
          <p className="text-black font-semibold">
            200 Public Square Cleveland, OH 44114 United States
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#658C58]">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-black font-semibold mb-1" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#658C58] text-black"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-black font-semibold mb-1" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#658C58] text-black"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-black font-semibold mb-1" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#658C58] text-black"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-black font-semibold mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#658C58] text-black"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#658C58] hover:bg-[#507144] text-white font-semibold py-4 rounded-xl mt-4 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
