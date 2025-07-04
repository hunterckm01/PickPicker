import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { setLoading } from '../../../slices/authSlice';
import { login } from "../../../services/operations/authAPI";
import { setLoading } from "../../../slices/profileSlice";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const PhotographerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPsd, setShowPsd] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [psdType, setPsdType] = useState(false);

  const onSubmit = async (data) => {
    console.log("Login Frontend");
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    dispatch(setLoading(true));
    dispatch(login(formData, navigate));

    // dispatch(setPhotographer(photographerData))
    dispatch(setLoading(false));
  };

  return (
    <section
      className="relative bg-[linear-gradient(120deg,_#c8a0ffb3_10%,_#6496ff80_100%)]
 w-screen min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-131px)"
    >
      {/* Photographer Logo */}
      <div className="flex w-full justify-center items-center absolute top-[120px]">
        <div className=" flex items-center justify-center bg-[#D9D9D9] w-[86px] h-[86px] top-[159px] mx-auto font-syne text-black rounded-full  text-[75px]">
          <p className="text-center relative top-[-10px]">p</p>
        </div>
      </div>

      {/* Form  */}
      <div className="w-full relative top-[220px]">
        <form
          className="flex flex-col gap-5 mx-auto w-[340px] sm:w-[600px] lg:w-[682px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Back Button */}
          <button className="moveButton" onClick={() => navigate(-1)}>
            <FaArrowLeft className="text-3xl" />
          </button>

          <div className="w-full inputBox">
            <label
              htmlFor="email"
              id="email"
              className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
            >
              Email
            </label>

            <div
              className="inputAnsBox
"
            >
              <input
                type="email"
                id="email"
                placeholder="sanukumar2026@gmail.com"
                className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-20px)] sm:w-[calc(100%-30px)] lg:w-[calc(100%-40px)]  outline-none focus:outline-none focus:ring-0"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="mt-2 text-xs text-red-500">
                  Email is Required
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full bg-white inputBox">
            <label
              htmlFor="password"
              id="password"
              className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
            >
              Password
            </label>
            <div className="inputAnsBox flex flex-col">
              <div className="flex items-center ">
                <input
                  type={showPsd ? "text" : "password"}
                  id="password"
                  placeholder="Asdsfsd112"
                  className="font-syne relative left-5 text-[12px] sm:text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 "
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9$._,]{8,}$/,
                      message: "Password is smaller",
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
                  {errors.password.message || "Password is required"}
                </span>
              )}
            </div>
          </div>

          {/* Move Next Button */}
          <button className="moveButton self-end">
            <FaArrowRight className="text-2xl" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default PhotographerLogin;
