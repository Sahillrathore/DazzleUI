import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { logoutUser } from "../utils/apiCall";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import Signup from "../pages/Signup";

export default function Header() {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false); // used for desktop hover & mobile click
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile nav
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // close menus on route change or on escape key
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleCreate = () => {
    if (user) navigate("/create");
    else setSignupModal(true);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setDropdownOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // Helper to toggle mega menu differently on small vs large screens
  const toggleMegaMenu = () => {
    // on mobile (smaller than md), we open via click; on desktop it's controlled by hover (see markup)
    setMegaMenuOpen((s) => !s);
  };

  return (
    <header className="bg-transparent text-white px-4 md:px-10 py-3 md:py-4 shadow-md">
      <div className=" mx-auto flex items-center justify-between gap-4">
        {/* left: logo + desktop nav */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <span className="text-purple-400">Dora</span>UI
          </Link>

          {/* Desktop nav (hidden on small screens) */}
          <nav className="hidden md:flex items-center gap-2">
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              {/* Mega menu trigger */}
              <button
                onClick={toggleMegaMenu}
                aria-haspopup="true"
                aria-expanded={isMegaMenuOpen}
                className="px-3 py-1 rounded hover:bg-white/10 transition font-medium"
              >
                Elements
              </button>

              {/* Mega menu (desktop) */}
              <div
                className={`absolute top-8 left-0 z-50 bg-zinc-900 p-4 rounded-xl shadow-lg w-[750px] grid grid-cols-3 gap-2 border-4 border-white/10 transform transition-all duration-150 origin-top ${
                  isMegaMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
                role="menu"
              >
                <div className="flex flex-col gap-0 h-full justify-between">
                  <MenuItem name="All" count="" icon="📖" redirect="/elements" />
                  <MenuItem name="Checkboxes" count="285" icon="☑️" redirect="/elements" />
                  <MenuItem name="Cards" count="1193" icon="📇" redirect="/elements" />
                  <MenuItem name="Inputs" count="341" icon="📝" redirect="/elements" />
                  <MenuItem name="Forms" count="237" icon="📋" redirect="/elements" />
                  <MenuItem name="Tooltips" count="118" icon="❓" redirect="/elements" />
                </div>
                <div className="flex flex-col gap-0 justify-between">
                  <MenuItem name="Buttons" count="2225" icon="🎛️" redirect="/elements" />
                  <MenuItem name="Toggle switches" count="380" icon="🔁" redirect="/elements" />
                  <MenuItem name="Loaders" count="1006" icon="⏳" redirect="/elements" />
                  <MenuItem name="Radio buttons" count="161" icon="🔘" redirect="/elements" />
                  <MenuItem name="Patterns" count="189" icon="🌀" redirect="/elements" />
                  <MenuItem name="My favorites" count="" icon="📌" redirect="/elements" />
                </div>
                <div className="bg-gradient-to-br max-h-fit from-purple-500 to-blue-600 rounded-xl text-center px-4 py-6 flex flex-col justify-between">
                  <img src="https://uiverse.io/assets/astronaut-LQ_BQU63.png" alt="Astronaut" className="h-32 mx-auto mb-4" />
                  <h3 className="font-bold text-2xl">We're on <br /> Social Media</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Follow us to find out about new challenges, updates and posts.
                  </p>
                  <div className="flex justify-center gap-4">
                    <SocialIcon name="discord" />
                    <SocialIcon name="x" />
                    <SocialIcon name="instagram" />
                  </div>
                </div>
              </div>
            </div>

            <Link className="px-3 py-1 rounded hover:bg-white/10 transition font-medium flex items-center gap-2">
              Challenges <span className="text-green-500">•</span>
            </Link>

            <Link className="px-3 py-1 rounded hover:bg-white/10 transition font-medium">Spotlight</Link>
          </nav>
        </div>

        {/* right: actions */}
        <div className="flex items-center gap-3">
          {/* + Create (always visible) */}
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 px-3 md:px-4 py-1.5 rounded text-white font-semibold"
            onClick={handleCreate}
          >
            + Create
          </button>

          {/* Desktop profile / join */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <img
                  src="https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740"
                  className="rounded-full w-10 h-10 border border-gray-600 cursor-pointer"
                  onClick={() => setDropdownOpen((p) => !p)}
                  alt="avatar"
                />
                <div
                  className={`absolute right-0 mt-4 w-40 bg-[#1B1B1B] border border-white/10 rounded-lg shadow-lg p-1 z-50 transform transition-all duration-200 ease-out origin-top ${
                    isDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="flex rounded items-center gap-2 px-4 py-2 hover:bg-white/10 text-gray-200 text-sm font-normal"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span><FaRegUser /></span> View Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex rounded items-center gap-2 w-full text-left px-4 py-2 hover:bg-white/10 text-gray-200 text-sm font-normal"
                  >
                    <span><AiOutlineLogout /></span> Log out
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-white/10 px-4 py-1.5 rounded text-white font-semibold flex items-center gap-2"
                onClick={() => setSignupModal(true)}
              >
                🚀 Join the Community
              </button>
            )}
          </div>

          {/* Mobile hamburger (visible only on small screens) */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="p-2 rounded hover:bg-white/10"
            >
              {/* simple hamburger / X icon */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - slide down / full width */}
      <div
        className={`md:hidden bg-[#9f9f9f0b] backdrop-blur-lg border-t border-white/5 overflow-hidden transition-all duration-200 ${
          isMobileMenuOpen ? "max-h-[1000px] py-4" : "max-h-0"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col gap-3">
          {/* Elements (mobile uses a click to open full mobile mega) */}
          <div>
            <button
              onClick={toggleMegaMenu}
              aria-expanded={isMegaMenuOpen}
              className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition font-medium flex justify-between items-center"
            >
              <span>Elements</span>
              <span className="text-sm opacity-80">{isMegaMenuOpen ? "−" : "+"}</span>
            </button>

            {isMegaMenuOpen && (
              <div className="mt-2 grid grid-cols-1 gap-2">
                <MenuItem name="All" count="" icon="📖" redirect="/elements" />
                <MenuItem name="Checkboxes" count="285" icon="☑️" />
                <MenuItem name="Cards" count="1193" icon="📇" />
                <MenuItem name="Inputs" count="341" icon="📝" />
                <MenuItem name="Forms" count="237" icon="📋" />
                <MenuItem name="Tooltips" count="118" icon="❓" />
                <MenuItem name="Buttons" count="2225" icon="🎛️" />
                <MenuItem name="Toggle switches" count="380" icon="🔁" />
                <MenuItem name="Loaders" count="1006" icon="⏳" />
                <MenuItem name="Radio buttons" count="161" icon="🔘" />
                <MenuItem name="Patterns" count="189" icon="🌀" />
                <MenuItem name="My favorites" count="" icon="📌" />
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl text-center p-4 mt-2">
                  <h3 className="font-bold text-lg">We're on Social Media</h3>
                  <p className="text-sm text-white/80 mb-2">Follow us for updates.</p>
                  <div className="flex justify-center gap-3">
                    <SocialIcon name="discord" />
                    <SocialIcon name="x" />
                    <SocialIcon name="instagram" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link className="px-3 py-2 rounded hover:bg-white/5 transition font-medium flex items-center gap-2">
            Challenges <span className="text-green-500">•</span>
          </Link>

          <Link className="px-3 py-2 rounded hover:bg-white/5 transition font-medium">Spotlight</Link>

          {/* mobile actions */}
          <div className="flex gap-2 mt-1">
            <button
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 rounded text-white font-semibold"
              onClick={handleCreate}
            >
              + Create
            </button>

            {user ? (
              <div className="flex-1">
                <Link
                  to="/profile"
                  className="w-full block text-center px-3 py-2 rounded border border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full mt-2 block text-center px-3 py-2 rounded bg-white/5"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                className="flex-1 bg-white/10 px-3 py-2 rounded text-white font-semibold"
                onClick={() => setSignupModal(true)}
              >
                Join the Community
              </button>
            )}
          </div>
        </div>
      </div>

      {signupModal && <Signup setIsOpen={setSignupModal} />}
    </header>
  );
}

/* Reuse your MenuItem and SocialIcon components unchanged */
function MenuItem({ name, count, icon, redirect }) {
  return (
    <Link to={redirect} className="flex justify-between items-center px-4 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer">
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <span className="text-sm text-gray-300 font-medium">{name}</span>
      </div>
      {count && <span className="text-xs text-white/60">{count}</span>}
    </Link>
  );
}

function SocialIcon({ name }) {
  const icons = {
    discord: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
    x: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
  };

  return (
    <img
      src={icons[name]}
      alt={name}
      className="h-6 w-6 bg-black p-1 rounded-md shadow-md"
    />
  );
}
