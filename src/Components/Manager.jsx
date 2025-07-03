import React from "react";
import { ToastContainer, toast } from "react-toastify";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

const API_BASE = import.meta.env.VITE_API_BASE_URL;



defineElement(lottie.loadAnimation);

const notify = () =>
  toast.success("Password Saved Successfully !!", {
    position: "top-right",
    className: "text-green-400 relative top-[80px] font-bold bg-gray-800",
    icon: false,
    progressClassName: "bg-gray-800",
    autoClose: 1000,
  });

const handleClick = () => {
  const inputs = document.getElementsByClassName("password-input");
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.type = input.type === "password" ? "text" : "password";
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const websiteInput = e.target.querySelector(".website-input");
  const usernameInput = e.target.querySelector(".username-input");
  const passwordInput = e.target.querySelector("input.password-input");

  const website = websiteInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!website || !username || !password) {
    toast.error("Please fill in all fields!", {
      position: "top-right",
      className: "text-red-400 relative top-[80px] font-bold bg-gray-800",
      autoClose: 1500,
      icon: false,
      progressClassName: "bg-gray-800",
    });
    return;
  }

  const data = { website, username, password };

  try {
    const response = await fetch(`${API_BASE}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      notify();
      // Reset fields
      websiteInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";
    } else {
      throw new Error("Save failed");
    }
  } catch (error) {
    console.error("Error saving password:", error);
    toast.error("Failed to save password!", {
      position: "top-right",
      className: "text-red-400 relative top-[80px] font-bold bg-gray-800",
      autoClose: 1500,
      icon: false,
      progressClassName: "bg-gray-800",
    });
  }
};

const Manager = (props) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-full px-[2vh] py-[1vh] gap-[2vh] max-h-[53vh]">
        <ToastContainer />

        <h1 className="text-[clamp(1.5rem,3vh,2.25rem)] font-bold mb-[1vh] text-center leading-tight">
          Password Manager
        </h1>

        <form
          className="flex flex-col justify-center items-center gap-[2vh] w-full"
          onSubmit={handleSubmit}
        >
          <p className="font-roboto text-center w-full text-[clamp(0.85rem,1.5vh,1.1rem)]">
            Securely store and manage your passwords with our easy-to-use
            password manager.
          </p>

          <div className="flex gap-[15.625vw] mb-[1.5vh]">
            <input
              className="website-input font-semibold text-center text-[clamp(0.8rem,1.5vh,1.1rem)] hover:bg-opacity-60 font-roboto border-2 border-[#c6b4f0] bg-[#f3eaff] w-[23.4375vw] h-[4.93vh] rounded-full text-[#4b0082] placeholder-[#4b0082] shadow-md"
              type="text"
              placeholder="Website Name"
            />
            <input
              className="username-input font-semibold text-center text-[clamp(0.8rem,1.5vh,1.1rem)] hover:bg-opacity-60 font-roboto border-2 border-[#c6b4f0] bg-[#f3eaff] w-[23.4375vw] h-[4.93vh] rounded-full text-[#4b0082] placeholder-[#4b0082] shadow-md"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="relative flex items-center mb-[1.5vh]">
            <input
              className="password-input text-center px-[2vh] font-bold text-[clamp(0.85rem,1.5vh,1rem)] border-2 border-[#c6b4f0] bg-[#f3eaff] w-[62.5vw] h-[4.63vh] rounded-full shadow-md text-[#4b0082] placeholder-[#4b0082]"
              type="password"
              placeholder="Enter Password"
            />
            <span className="absolute right-4" onClick={handleClick}></span>
          </div>

          <button
            className="bg-green-400 hover:bg-green-500 active:font-bold text-black flex justify-center items-center gap-[1vh] rounded-full py-[1vh] px-[2vh] shadow-lg font-medium text-[clamp(0.85rem,1.5vh,0.9375rem)]"
            type="submit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <span>Save Password</span>
          </button>
        </form>

        <button
          className="bg-green-400 hover:bg-green-500 active:font-bold h-[6.23vh] text-black flex justify-center items-center gap-[1vh] rounded-full py-[1vh] px-[2vh] shadow-lg font-medium text-[clamp(0.85rem,1.5vh,0.9375rem)]"
          onClick={props.sendTrigger}
        >
          Show Passwords
        </button>
      </div>
    </div>
  );
};

export default Manager;
