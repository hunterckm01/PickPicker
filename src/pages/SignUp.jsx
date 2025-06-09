import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router";

const SignUp = () => {

  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');

  function emailHandler(e){
    setEmail(e.target.value)
    console.log("email now is", email)
  }

  function sendOtpEvent(){
    dispatch(sendOtp(email))
    
  }

  const onSubmit = async(data) => {
    const formData = new FormData()
    
    formData.append("studioName", data.studio)
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPsd", data.confirmPsd);
    formData.append("otp", data.Otp)
    console.log("SignUp Form Data after appending", data)
    
    setLoading(true)
    dispatch(signUp(formData, navigate))
    // console.log("Done submission")
    // setLoading(false)
  } 


  return (
    <section className="relative bg-[linear-gradient(120deg,_#c8a0ffb3_10%,_#6496ff80_100%)] pb-6">

      {
        loading ? (
        <div>Loading...</div>
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
            <button className="moveButton">
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
                  {...register("studio", {required: true})}
                />
                {errors.studio && (
                  <span className="mt-2 text-xs text-red-500">
                    Studio Name is Required
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
                  {...register("email", {required: true})}
                  onChange={emailHandler}
                />
                {errors.email && (
                  <span className="mt-2 text-xs text-red-500">
                    Email is Required
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
                  {...register("firstName", {required: true})}
                />
                {errors.firstName && (
                  <span className="mt-2 text-xs text-red-500">First Name is required</span>
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
                  {...register("lastName", {required: true})}
                />
                {errors.lastName && (
                  <span className="mt-2 text-xs text-red-500">Last Name is required</span>
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

              <div className="inputAnsBox">
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="Asdsfsd112"
                  className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                  {...register("password", {required: true})}
                />
                {errors.password && (
                  <span className="mt-2 text-xs text-red-500">Password is required</span>
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
              <div className="inputAnsBox">
                <input
                  required
                  type="password"
                  id="confirmPsd"
                  placeholder="Asdsfsd112"
                  className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                  {...register("confirmPsd", {required: true})}
                />
                {errors.confirmPsd && (
                  <span className="mt-2 text-xs text-red-500">Confirm Password is required</span>
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
                  {...register("Otp", {required: true})}
                />
                {errors.otp && (
                  <span className="mt-2 text-xs text-red-500">Otp is required</span>
                )}
              </div>
            </div>

            {/* Move Next Button */}
            <div className="flex justify-between">
              <div onClick = {sendOtpEvent}
              className="bg-white p-2 font-medium font-syne text-base rounded-[30px] cursor-pointer">
                Send Otp
              </div>

              <button className="moveButton cursor-pointer">
                <FaArrowRight className="text-2xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
        )
      }
    </section>
  );
};

export default SignUp;
