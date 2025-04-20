import React, { useState } from "react";
import { FaGithub, FaGoogle, FaXTwitter } from "react-icons/fa6";

const Signup = () => {
    const [isSignup, setIsSignup] = useState(true);

    const loginWithGoogle = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-gradient-to-b from-[#2b2b62] via-[#1a1a1a] to-[#1a1a1a] rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden text-white">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-5 text-white text-2xl"
                    onClick={() => console.log("Close modal")}
                >
                    &times;
                </button>

                {/* Astronaut */}
                <img
                    src='https://uiverse.io/assets/astronaut-LQ_BQU63.png'
                    alt="astronaut"
                    className="absolute -top-5 -left-10 w-32 rotate-6"
                />

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3 mt-8">
                    {isSignup ? "Join the Community" : "Welcome Back"}
                </h2>

                {/* Subtitle */}
                {isSignup && (
                    <p className="text-center font-bold text-gray-300 text-sm max-w-sm mx-auto mb-6">
                        Create beautiful UI elements and share them with 100,000+ developers
                    </p>
                )}

                {/* Features */}
                {isSignup && (
                    <ul className="text-sm text-gray-400 w-fit mx-auto space-y-1 mb-6 px-2">
                        <li className="flex items-center gap-2">
                            ✅ Create and share unlimited UI elements
                        </li>
                        <li className="flex items-center gap-2">
                            ✅ Get inspiration from thousands of designs
                        </li>
                        <li className="flex items-center gap-2">
                            ✅ Join a thriving community of creators
                        </li>
                    </ul>
                )}

                {/* Buttons */}
                <div className="flex flex-col items-center gap-3 w-full">
                    <button className="w-2/3 flex items-center justify-center gap-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2 rounded-md text-sm font-medium transition">
                        <FaGithub />
                        {isSignup ? "Continue with GitHub" : "Sign in with GitHub"}
                    </button>
                    <button className="w-2/3 flex items-center justify-center gap-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2 rounded-md text-sm font-medium transition"
                        onClick={loginWithGoogle}
                    >
                        <FaGoogle className="text-[#EA4335]" />
                        {isSignup ? "Continue with Google" : "Sign in with Google"}
                    </button>
                    <button className="w-2/3 flex items-center justify-center gap-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2 rounded-md text-sm font-medium transition">
                        <FaXTwitter />
                        {isSignup ? "Continue with" : "Sign in with"} <span>X</span>
                    </button>
                </div>

                {/* Terms & Links */}
                <div className="text-center text-sm text-gray-400 mt-6">
                    {isSignup ? (
                        <>
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-gray-300 underline">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-gray-300 underline">
                                Privacy Policy
                            </a>
                            .
                            <div className="mt-3">
                                Already have an account?{" "}
                                <button
                                    className="text-gray-300 underline"
                                    onClick={() => setIsSignup(false)}
                                >
                                    Sign in
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{" "}
                            <button
                                className="text-white underline"
                                onClick={() => setIsSignup(true)}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
