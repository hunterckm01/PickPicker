import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false)
  const loading = false;

  const [email, setEmail] = useState("");
  const [showPsd, setShowPsd] = useState(false);
  const [showConPsd, setShowConPsd] = useState(false);

  function emailHandler(e) {
    setEmail(e.target.value);
    console.log("email now is", e.target.value);
  }

  const validateEmail = () => {
    const emailRegex = /^[\w.-]+@[a-zA-z\d.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) return true;
    else return false;
  };

  function sendOtpEvent() {
    if (validateEmail()) dispatch(sendOtp(email));
    else toast.error("Invalid Email Type");
  }

  const onSubmit = async (data) => {
    console.log("On submit handler is called", data);
    const formData = new FormData();

    formData.append("studioName", data.studio);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPsd", data.confirmPsd);
    formData.append("otp", data.Otp);
    console.log("SignUp Form Data after appending", data);

    // setLoading(true)
    dispatch(signUp(formData, navigate));
    // console.log("Done submission")
    // setLoading(false)
  };

  return (
    <section className="relative bg-[linear-gradient(120deg,_#c8a0ffb3_10%,_#6496ff80_100%)] pb-6">
      {loading ? (
        <div className="w-full min-h-[calc(100vh-131px)]">Loading...</div>
      ) : (
        <div className="w-full">
          {/* Photographer Logo */}
          <div className="flex w-full justify-center items-center relative top-[50px]">
            <div className="flex items-center justify-center bg-[#D9D9D9] w-[72px] h-[72px]  mx-auto font-syne text-black rounded-full  text-[60px]">
              <p className="text-center relative top-[-10px]">p</p>
            </div>
          </div>
          {/* Form  For tablet and pc*/}
          <div className="w-full mt-[80px]">
            <form
              className="flex flex-col gap-5 mx-auto w-[340px] sm:w-[600px] lg:w-[682px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Back Button */}
              <button className="moveButton" onClick={() => navigate(-1)}>
                <FaArrowLeft className="text-2xl" />
              </button>

              <div className="w-full inputBox">
                <label
                  htmlFor="studio"
                  id="studio"
                  className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  Studio
                </label>

                <div className="inputAnsBox flex flex-col">
                  <input
                    required
                    type="text"
                    id="studio"
                    placeholder="shanu.fetish"
                    className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-20px)] sm:w-[calc(100%-30px)] lg:w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("studio", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "Minimum 3 Letter Should be",
                      },
                    })}
                  />
                  {errors.studio && (
                    <span className="left-5 relative top-1 text-xs text-red-500">
                      {errors.studio.message || "Studio Name is Required"}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="email"
                  id="email"
                  className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  Email
                </label>

                <div className="inputAnsBox flex flex-col">
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="sanukumar2026@gmail.com"
                    className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-20px)] sm:w-[calc(100%-30px)] lg:w-[calc(100%-40px)]  outline-none focus:outline-none focus:ring-0"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter valid email address",
                      },
                    })}
                    onChange={emailHandler}
                  />
                  {errors.email && (
                    <span className="left-5 relative top-1 text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="firstName"
                  id="firstName"
                  className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  First Name
                </label>

                <div className="inputAnsBox flex flex-col">
                  <input
                    required
                    type="text"
                    id="firstName"
                    placeholder="Shanu"
                    className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("firstName", {
                      required: true,
                      pattern: /^[a-zA-Z]+$/,
                    })}
                  />
                  {errors.firstName && (
                    <span className="left-5 relative top-1 text-xs text-red-500">
                      First Name is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="lastName"
                  id="lastName"
                  className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  Last Name
                </label>

                <div className="inputAnsBox flex flex-col">
                  <input
                    required
                    type="text"
                    id="lastName"
                    placeholder="Kumar"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("lastName", {
                      required: true,
                      pattern: /^[a-zA-Z]+$/,
                    })}
                  />
                  {errors.lastName && (
                    <span className="left-5 relative top-1 text-xs text-red-500">
                      Last Name is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="password"
                  id="password"
                  className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  Password
                </label>

                <div className="inputAnsBox flex flex-col ">
                  <div className="w-full flex items-center">
                    <input
                      required
                      type={showPsd ? "text" : "password"}
                      id="password"
                      placeholder="Asdsfsd112"
                      className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 "
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern: {
                          value: /^[a-zA-Z0-9$._,]{8,}$/,
                          message: "At least 8 characters needed ",
                        },
                      })}
                    />
                    {showPsd ? (
                      <BsEyeFill
                        className="relative left-[20px] w-[24px] h-[24px] cursor-pointer"
                        onClick={() => setShowPsd(!showPsd)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="relative left-[20px] w-[24px] h-[24px] cursor-pointer"
                        onClick={() => setShowPsd(!showPsd)}
                      />
                    )}
                  </div>
                  {errors.password && (
                    <span className="relative left-5 top-1 text-xs text-red-500">
                      {errors.password.message ||
                        "Password should be at least 8 characters"}
                    </span>
                  )}
                  {/* Password Hide Icon */}
                </div>
              </div>

              <div className="flex w-full bg-white inputBox">
                <label
                  htmlFor="confirmPsd"
                  id="confirmPsd"
                  className="font-w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  {"Confirm Password"}
                </label>
                <div className="inputAnsBox flex flex-col">
                  <div className="w-full flex items-center">
                    <input
                      required
                      type={showConPsd ? "text" : "password"}
                      id="confirmPsd"
                      placeholder="Asdsfsd112"
                      className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                      {...register("confirmPsd", {
                        required: true,
                        validate: (match) => {
                          const password = getValues("password");
                          return match === password || "Passwords should match";
                        },
                      })}
                    />
                    {showConPsd ? (
                      <BsEyeFill
                        className="relative left-[20px] w-[24px] h-[24px] cursor-pointer"
                        onClick={() => setShowConPsd(!showConPsd)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="relative left-[20px] w-[24px] h-[24px] cursor-pointer"
                        onClick={() => setShowConPsd(!showConPsd)}
                      />
                    )}
                  </div>
                  {errors.confirmPsd && (
                    <span className="relative left-5 top-1 text-xs text-red-500">
                      {errors.confirmPsd.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full bg-white inputBox">
                <label
                  htmlFor="Otp"
                  id="Otp"
                  className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
                >
                  Otp
                </label>
                <div className="inputAnsBox flex flex-col">
                  <input
                    required
                    type="Number"
                    id="Otp"
                    minLength="5"
                    placeholder="Asdsfsd112"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("Otp", { required: true })}
                  />
                  {errors.otp && (
                    <span className="left-5 relative top-1 text-xs text-red-500">
                      Otp is required
                    </span>
                  )}
                </div>
              </div>

              {/* Move Next Button */}
              <div className="flex justify-between">
                <div
                  onClick={sendOtpEvent}
                  className="bg-white p-2 font-medium font-syne text-base rounded-[30px] cursor-pointer"
                >
                  Send Otp
                </div>
                  <span className="text-red-700 text-xs">Please Wait For Otp a quite, since it's deployed on render</span>
                <button className="moveButton cursor-pointer">
                  <FaArrowRight className="text-2xl" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUp;
