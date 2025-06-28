import React, { useState, useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { ToastContainer, toast } from "react-toastify";

defineElement(lottie.loadAnimation);

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/");
    const data = await res.json();
    console.log("Fetched data from backend:", data); 
    return data || [];
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
};

const useUserData = () => {
  const [userData, setUserData] = useState([]);

  // Initial load
  useEffect(() => {
    const fetchDataOnce = async () => {
      const data = await getData();
      setUserData(data);
    };
    fetchDataOnce();
  }, []);

  // Poll every 1 second
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getData();
      setUserData(data);
    }, 1000); // 1000ms = 1s

    return () => clearInterval(interval);
  }, []);

  return [userData, setUserData];
};

const Database = (props) => {
  const [userData, setUserData] = useUserData();
  const [showPasswords, setShowPasswords] = useState({});

  const handleDelete = async (idx) => {
    const item = userData[idx];
    if (!item || !item._id) return;

    try {
      const res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: item._id }),
      });

      const result = await res.json();

      if (result.success) {
        const updated = userData.filter((_, i) => i !== idx);
        setUserData(updated);
        deleted();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleCopy = async (idx, field) => {
    const data = userData;
    if (data && data[idx] && field && data[idx][field]) {
      navigator.clipboard.writeText(data[idx][field]);
      toast.success(
        `${field.charAt(0).toUpperCase() + field.slice(1)} copied!`,
        {
          position: "top-right",
          className: "text-green-400 relative top-[80px] font-bold bg-gray-800",
          autoClose: 1000,
          icon: false,
          progressClassName: "bg-gray-800",
        }
      );
    }
  };

  const handleTogglePassword = (idx) => {
    setShowPasswords((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const deleted = () =>
    toast.success("Password Deleted Successfully !!", {
      position: "top-right",
      className: "text-green-400 relative top-[8vh] font-bold bg-gray-800",
      autoClose: 1000,
      icon: false,
      progressClassName: "bg-gray-800",
    });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <ToastContainer />
      {props.button === true ? (
        userData && userData.length > 0 ? (
          <div className="w-full max-w-6xl mx-4 shadow-2xl shadow-gray-700/60 rounded-lg max-h-[27vh] flex flex-col overflow-hidden">
            <div className="flex flex-row border-b-2 bg-[#d5c4f2] rounded-t-lg border-black h-[10vh] w-full justify-evenly text-[0.75rem] md:text-[1rem]">
              <div className="border-r w-1/4 flex font-semibold justify-center font-roboto items-center text-black border-black px-1">
                Website Name
              </div>
              <div className="border-r w-1/4 flex justify-center font-roboto font-semibold items-center text-black border-black px-1">
                Username
              </div>
              <div className="w-1/4 border-r font-roboto flex justify-center font-semibold items-center text-black border-black px-1">
                Password
              </div>
              <div className="w-1/4 font-roboto flex justify-center font-semibold items-center text-black px-1">
                Actions
              </div>
            </div>
            <ul className="flex-1 overflow-y-scroll scrollbar-hide">
              {userData.map((element, idx) => (
                <li
                  key={element._id}
                  className="flex flex-row border-b border-black max-h-[17vh] w-full text-[0.75rem] md:text-[1rem]"
                >
                  <div className="website gap-2 md:gap-5 border-r h-auto w-1/4 flex justify-center font-roboto items-center text-black border-black">
                    <div className="text-[clamp(0.8rem,1.2vw,1.1rem)]">
                      {element.website}
                    </div>
                    <lord-icon
                      className="hover:cursor-pointer"
                      style={{ width: "1.5625rem", height: "1.5625rem" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="click"
                      onClick={() => handleCopy(idx, "website")}
                    ></lord-icon>
                  </div>
                  <div
                    className="username gap-2 md:gap-5 border-r h-12 w-1/4 flex justify-center font-roboto items-center text-black border-black px-1"
                    style={{
                      overflowX: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div
                      className="text-[clamp(0.8rem,1.2vw,1.1rem)] whitespace-nowrap overflow-x-auto scrollbar-hide"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {element.username}
                    </div>
                    <lord-icon
                      className="hover:cursor-pointer"
                      style={{
                        width: "1.5625rem",
                        height: "1.5625rem",
                        minWidth: "1.5625rem",
                        minHeight: "1.5625rem",
                      }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="click"
                      onClick={() => handleCopy(idx, "username")}
                    ></lord-icon>
                  </div>
                  <div className="border-r border-black w-1/4 h-12 font-roboto flex justify-center items-center text-black px-1">
                    <div className="flex flex-row items-center gap-2 justify-center">
                      <input
                        className="password-input w-[8vw] bg-transparent border-none outline-none text-[clamp(0.8rem,1.2vw,1.1rem)]"
                        type={showPasswords[idx] ? "text" : "password"}
                        value={element.password}
                        readOnly
                      />
                      <button
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleTogglePassword(idx)}
                        aria-label={
                          showPasswords[idx] ? "Hide password" : "Show password"
                        }
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        {showPasswords[idx] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5625rem"
                            height="1.5625rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.05 10.05 0 0112 19C7 19 2.73 15.89 1 11.5a11.72 11.72 0 012.99-4.36M6.53 6.53A8 8 0 0112 5c5 0 9.27 3.11 11 7.5a11.7 11.7 0 01-5.17 5.61M15 12a3 3 0 01-6 0" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5625rem"
                            height="1.5625rem"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="w-1/4 h-12 font-roboto flex justify-center gap-2 md:gap-5 items-center text-black px-1">
                    <lord-icon
                      className="hover:cursor-pointer"
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="click"
                      style={{ width: "1.5625rem", height: "1.5625rem" }}
                      onClick={() => handleDelete(idx)}
                    ></lord-icon>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="relative top-24 font-roboto text-center w-full text-[1rem]">
            No Saved Passwords
          </p>
        )
      ) : null}
    </div>
  );
};

export default Database;
