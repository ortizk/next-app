"use client";

import React, { FormEvent, useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");

  const handleInput = (e) => {
    const fielName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fielName]: fieldValue,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const formURL = e.target.action;
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setFormSuccess(true);
        setFormSuccessMessage(data);
      });
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Sign Up
        </h1>
        {formSuccess ? (
          <div>Form Submitted</div>
        ) : (
          <form
            className="space-y-4"
            method="POST"
            action="/api/auth/signup"
            onSubmit={submitForm}
          >
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleInput}
                value={formData.name}
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                onChange={handleInput}
                value={formData.email}
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                value={formData.password}
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleInput}
                value={formData.confirmPassword}
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <button className="btn btn-block">Sign Up</button>
            </div>
            <span>
              Already have an account ?
              <a
                href="/api/auth/signin"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Login
              </a>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
