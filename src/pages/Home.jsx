import React from "react";
import { NavbarLinks } from "../data/navbar-links";
import {Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router";
// import Navbar from "../components/common/Navbar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Home */}
      <section class="mt-10 px-6" id="home">
        <div class="bg-gradient-to-br from-[#e9ceff] to-[#fad0fc] rounded-3xl shadow-2xl p-12 flex flex-col lg:flex-row items-center justify-between gap-14 depth">
          <div class="bg-white/80 glass rounded-2xl p-6 w-72 h-60 flex flex-col justify-between shadow-inner text-gray-800 text-base relative border-2 border-pink-200">
            <div class="absolute -top-4 left-4 text-xs bg-pink-500 px-3 py-1 rounded-full font-bold shadow">
              Photo Selector
            </div>
            <div class="flex flex-col items-center mt-8">
              <img
                src="https://img.icons8.com/ios-filled/100/e954b5/camera--v1.png"
                class="w-16 h-16 mb-2"
                alt="Event"
              />
              <div class="bg-pink-200 w-32 h-8 rounded-full text-center text-pink-700 font-bold flex items-center justify-center shadow">
                Select Customer
              </div>
            </div>
            <div class="bg-gradient-to-tr from-pink-400 to-purple-300 h-28 w-full mt-6 rounded-xl shadow-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">
                Your Event Photos
              </span>
            </div>
          </div>
          <div class="text-center lg:text-left max-w-xl">
            <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow">
              India's Simplest <span class="text-purple-700">Online</span>
              <br />
              Photo Selection Software
            </h1>
            <p class="mt-6 text-lg text-gray-700">
              If you are a professional wedding photographer, a party
              photographer, or even a corporate photographer, let your clients
              experience the best online photo selection with{" "}
              <span class="font-bold text-pink-600">Pic Picker</span>.
            </p>
            <button class="mt-8 px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-full hover:duration-200 hover:scale-105 transition-shadow shadow-xl" onClick={()=>navigate("/signup")}>
              Try for Free
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Stats --> */}
      <section class="mt-14 px-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-gradient-to-r from-[#f4c4f3] to-[#fc67fa] text-white text-center py-12 rounded-3xl shadow-2xl depth">
          <div class="flex flex-col items-center gap-3 bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <div class="bg-pink-500 rounded-full w-16 h-16 flex items-center justify-center shadow">
              <img
                src="https://img.icons8.com/ios-filled/64/ffffff/calendar--v1.png"
                class="w-10 h-10"
                alt="Events"
              />
            </div>
            <h3 class="text-xl font-bold mt-2">Events</h3>
            <p class="text-3xl font-extrabold tracking-wider">2200+</p>
          </div>
          <div class="flex flex-col items-center gap-3 bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <div class="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center shadow">
              <img
                src="https://img.icons8.com/ios-filled/64/ffffff/user.png"
                class="w-10 h-10"
                alt="Users"
              />
            </div>
            <h3 class="text-xl font-bold mt-2">Users</h3>
            <p class="text-3xl font-extrabold tracking-wider">2200+</p>
          </div>
          <div class="flex flex-col items-center gap-3 bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <div class="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center shadow">
              <img
                src="https://img.icons8.com/ios-filled/64/ffffff/picture.png"
                class="w-10 h-10"
                alt="Photos"
              />
            </div>
            <h3 class="text-xl font-bold mt-2">Photos</h3>
            <p class="text-3xl font-extrabold tracking-wider">2200+</p>
          </div>
        </div>
      </section>

      {/* <!-- How to Use --> */}
      <section class="mt-12 px-6" id="assist">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 text-center text-purple-800 tracking-tight">
          How to Use?
        </h2>
        <div class="flex flex-col md:flex-row justify-center gap-8">
          {/* <!-- Step 1 --> */}
          <div class="flex-1 bg-white glass rounded-2xl shadow-xl p-8 flex flex-col items-center depth hover:scale-105 transition">
            <div class="bg-pink-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/upload.png"
                class="w-8 h-8"
                alt="Upload"
              />
            </div>
            <h3 class="font-bold text-lg mb-2 text-pink-700">
              1. Upload Photos
            </h3>
            <p class="text-gray-700 text-sm">
              Add your event or session photos to start the selection process.
            </p>
          </div>
          {/* <!-- Step 2 --> */}
          <div class="flex-1 bg-white glass rounded-2xl shadow-xl p-8 flex flex-col items-center depth hover:scale-105 transition">
            <div class="bg-purple-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/share.png"
                class="w-8 h-8"
                alt="Send"
              />
            </div>
            <h3 class="font-bold text-lg mb-2 text-purple-700">
              2. Send for Selection
            </h3>
            <p class="text-gray-700 text-sm">
              Share the selection link with your clients for easy online
              sorting.
            </p>
          </div>
          {/* <!-- Step 3 --> */}
          <div class="flex-1 bg-white glass rounded-2xl shadow-xl p-8 flex flex-col items-center depth hover:scale-105 transition">
            <div class="bg-green-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/ok.png"
                class="w-8 h-8"
                alt="Sort"
              />
            </div>
            <h3 class="font-bold text-lg mb-2 text-green-700">
              3. Sort & Finalize
            </h3>
            <p class="text-gray-700 text-sm">
              Review selections and finalize the best photos for your album or
              delivery.
            </p>
          </div>
        </div>
        <p class="mt-8 text-center font-semibold text-pink-600 text-lg">
          Simple as that!
        </p>
      </section>

      {/* <!-- Pricing --> */}
      <section class="mt-16 px-6 text-center" id="pricing">
        <h2 class="text-3xl font-extrabold mb-8 text-purple-800 tracking-tight">
          Pricing
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
          {/* <!-- Free Plan --> */}
          <div class="relative bg-gradient-to-br from-[#e3a8ff] to-[#f6f2ff] p-10 rounded-3xl shadow-2xl w-80 depth transform hover:scale-105 transition flex flex-col items-center border-4 border-white">
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/ab47bc/gift.png"
                class="w-10 h-10"
                alt="Free"
              />
            </div>
            <h3 class="text-2xl font-bold mb-2 mt-8 text-purple-700">
              Free Plan
            </h3>
            <span class="inline-block bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Best for Starters
            </span>
            <p class="text-lg text-gray-800 mb-6">
              You can access everything we offer
            </p>
            <div class="text-4xl font-extrabold text-purple-700 mb-2">₹0</div>
            <button class="mt-4 px-6 py-2 bg-purple-700 text-white rounded-full font-semibold shadow-md hover:bg-purple-800 transition">
              Get Started
            </button>
          </div>
          {/* <!-- Premium Plan --> */}
          <div class="relative bg-gradient-to-br from-[#fcb0f1] to-[#fad0fc] p-10 rounded-3xl shadow-2xl w-80 depth transform hover:scale-105 transition flex flex-col items-center border-4 border-pink-300">
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg">
              <img
                src="https://img.icons8.com/ios-filled/50/e954b5/crown.png"
                class="w-10 h-10"
                alt="Premium"
              />
            </div>
            <h3 class="text-2xl font-bold mb-2 mt-8 text-pink-700">
              Premium Plan
            </h3>
            <span class="inline-block bg-pink-200 text-pink-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Most Popular
            </span>
            <p class="text-lg text-gray-800 mb-6">So why you looking for it</p>
            <div class="text-4xl font-extrabold text-pink-700 mb-2">₹999</div>
            <button class="mt-4 px-6 py-2 bg-pink-600 text-white rounded-full font-semibold shadow-md hover:bg-pink-700 transition">
              Go Premium
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Final CTA --> */}
      <section class="mt-20 px-6 text-center" id="reachus">
        <div class="bg-gradient-to-tr from-pink-400 to-purple-500 text-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto depth flex flex-col items-center">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/checked--v1.png"
            class="w-14 h-14 mb-4"
            alt="Sort"
          />
          <h2 class="text-2xl md:text-3xl font-extrabold mb-2">
            Ready to get started?
          </h2>
          <p class="text-lg mb-4">
            You can easily register and use it. Just put the OTP and get
            started.
          </p>
          <button class="px-8 py-3 bg-white text-pink-700 font-bold text-lg rounded-full mb-4 shadow-lg hover:scale-105 transition">
            Try for Free
          </button>
          <p class="text-base text-white mt-2 font-semibold tracking-wide">
            Let’s sort this out.
          </p>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer class="mt-12 bg-gradient-to-tr from-gray-800 to-[#1f1b2e] text-white text-sm px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center text-center">
          <div class="space-y-1 mb-4 md:mb-0">
            {NavbarLinks.map((link, index) => (
              <p
                key={index}
                className="  cursor-pointer"
              >
                <ScrollLink
                  to={link.id}
                  spy={true}
                  smooth={true}
                  offset={-120}
                  duration={500}
                >
                  {link.title.toUpperCase()}
                </ScrollLink>
              </p>
            ))}
            {/* <p className="cursor-pointer">HOME</p>
            <p className="cursor-pointer">ASSIST</p>
            <p className="cursor-pointer">PRICING</p>
            <p className="cursor-pointer">REACH US</p> */}
          </div>
        </div>
        <div class="mt-4 text-center text-white font-bold tracking-wide">
          Designed by <span class="text-white">DeskHomies</span>
          <p class="text-xs text-gray-400 mt-2 md:mt-0">
            This is a College Project submitted by Shanu, Chandan, Shreyashi,
            Abhilash
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
