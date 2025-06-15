import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const SignUp = () => {

  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)
  const loading = false ;

  const [email, setEmail] = useState('');
  const [showPsd, setShowPsd] = useState(false)
  const [showConPsd, setShowConPsd] = useState(false);

  function emailHandler(e){
    setEmail(e.target.value)
    // console.log("email now is", email)
  }

  const validateEmail = () => {
    const emailRegex = /^[\w.-]+@[a-zA-z\d.-]+\.[a-zA-Z]{2,}$/ ;
    if(emailRegex.test(email))
      return true;
    else
      return false ;
  }

  function sendOtpEvent(){
    if(validateEmail())
      dispatch(sendOtp(email))
    else
      toast.error("Invalid Email Type")
  }



  const onSubmit = async(data) => {

    console.log("On submit handler is called", data)
    const formData = new FormData()
    
    formData.append("studioName", data.studio)
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPsd", data.confirmPsd);
    formData.append("otp", data.Otp)
    console.log("SignUp Form Data after appending", data)
    
    // setLoading(true)
    dispatch(signUp(formData, navigate))
    // console.log("Done submission")
    // setLoading(false)
  } 


  return (
    <section className="relative bg-[linear-gradient(120deg,_#c8a0ffb3_10%,_#6496ff80_100%)] pb-6">
      {loading ? (
        <div className="w-full min-h-[calc(100vh-131px)]">Loading...</div>
      ) : (
        <div className="w-full">
          {/* Photographer Logo */}
          <div className="flex w-full justify-center items-center relative top-[50px]">
            <div className=" flex items-center justify-center bg-[#D9D9D9] w-[72px] h-[72px]  mx-auto font-syne text-black rounded-full  text-[60px]">
              <p className="text-center relative top-[-10px]">p</p>
            </div>
          </div>
          {/* Form */}
          <div className="w-full mt-[80px] ">
            <form
              className="flex flex-col gap-5 mx-auto w-[682px]"
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
                  className="font-syne text-[16px] font-medium p-3"
                >
                  Studio
                </label>

                <div className="inputAnsBox">
                  <input
                    required
                    type="text"
                    id="studio"
                    placeholder="shanu.fetish"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("studio", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "Minimum 3 Letter Should be",
                      },
                    })}
                  />
                  {errors.studio && (
                    <span className="mt-2 text-xs text-red-500">
                      {errors.studio.message || "Studio Name is Required"}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="email"
                  id="email"
                  className="font-syne text-[16px] font-medium p-3"
                >
                  Email
                </label>

                <div className="inputAnsBox">
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="sanukumar2026@gmail.com"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z0,9._-]+@[a-zA-Z0,9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter valid email address",
                      },
                    })}
                    onChange={emailHandler}
                  />
                  {errors.email && (
                    <span className="mt-2 text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="firstName"
                  id="firstName"
                  className="font-syne text-[16px] font-medium p-3"
                >
                  First Name
                </label>

                <div className="inputAnsBox">
                  <input
                    required
                    type="text"
                    id="firstName"
                    placeholder="Shanu"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("firstName", {
                      required: true,
                      pattern: /^[a-zA-Z]+$/,
                    })}
                  />
                  {errors.firstName && (
                    <span className="mt-2 text-xs text-red-500">
                      First Name is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full inputBox">
                <label
                  htmlFor="lastName"
                  id="lastName"
                  className="font-syne text-[16px] font-medium p-3"
                >
                  Last Name
                </label>

                <div className="inputAnsBox">
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
                    <span className="mt-2 text-xs text-red-500">
                      Last Name is required
                    </span>
                  )}
                </div>
              </div>

              {/* <div className="w-full inputBox">
              <label
                htmlFor="phoneNumber"
                id="phoneNumber"
                className="font-syne text-[16px] font-medium p-3"
              >
                Phone Number
              </label>

              <div className="inputAnsBox">
                <input
                  required="true"
                  type="number"
                  id="phoneNumber"
                  placeholder="7788997788"
                  className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                  max = "10"
                />
              </div>
            </div> */}

              <div className="w-full inputBox">
                <label
                  htmlFor="password"
                  id="password"
                  className="font-syne text-[16px] font-medium p-3"
                >
                  Password
                </label>

                <div className="inputAnsBox flex items-center">
                  <input
                    required
                    type={showPsd ? "text" : "password"}
                    id="password"
                    placeholder="Asdsfsd112"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 "
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern: {
                        value: /^[a-zA-Z0-9$._,]{8,}$/,
                        message: "At least 8 characters needed ",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="mt-2 text-xs text-red-500">
                      Password is required
                    </span>
                  )}
                  {/* Password Hide Icon */}
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
              </div>

              <div className="flex w-full bg-white inputBox">
                <label
                  htmlFor="confirmPsd"
                  id="confirmPsd"
                  className="font-syne text-[16px] font-medium p-3"
                >
                  Confirm Password
                </label>
                <div className="inputAnsBox flex">
                  <input
                    required
                    type={showConPsd ? "text" : "password"}
                    id="confirmPsd"
                    placeholder="Asdsfsd112"
                    className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                    {...register("confirmPsd", {
                      required: true,
                      validate: (match) => {
                        const password = getValues("password");
                        return match === password || "Passwords should match";
                      },
                    })}
                  />
                  {errors.confirmPsd && (
                    <span className="mt-2 text-xs text-red-500">
                      {errors.confirmPsd.message}
                    </span>
                  )}
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
              </div>

              <div className="flex w-full bg-white inputBox">
                <label
                  htmlFor="Otp"
                  id="Otp"
                  className="font-syne text-[16px] font-medium p-3"
                >
                  Otp
                </label>
                <div className="inputAnsBox">
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
                    <span className="mt-2 text-xs text-red-500">
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
