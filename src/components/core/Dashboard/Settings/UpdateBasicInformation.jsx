import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/operations/profileAPI";
import IconButton from "../../../common/IconButton";
// import {  } from "react-router";

const UpdateBasicInformation = () => {
  const { photographer } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()

  const dispatch = useDispatch()

  const onSubmit = async(data) => {
    console.log("Form Data is", data)
    const formData = new FormData()

    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("studioName", data.studioName)
    dispatch(updateProfile(token, formData))
  }

  return (
    <div className="pt-[50px] w-[900px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-3xl font-sunflower">Basic Information</h2>

        <IconButton text="Update" onclick={handleSubmit(onSubmit)} />
      </div>

      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 "
      >
        {/* Email */}
        <div className="w-full inputBox">
          <label
            htmlFor="email"
            className="font-syne text-[16px] font-medium p-3"
          >
            Email
          </label>
          <div className="inputAnsBoxProfile">
            <input
              name="email"
              value={photographer.email}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        {/* Account Type */}
        <div className="w-full inputBox">
          <label
            htmlFor="accountType"
            className="font-syne text-[16px] font-medium p-3"
          >
            Account
          </label>
          <div className="inputAnsBoxProfile">
            <input
              name="accountType"
              value={photographer.accountType}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        {/* First Name */}
        <div className="w-full inputBox">
          <label
            htmlFor="firstName"
            className="font-syne text-[16px] font-medium p-3"
          >
            First Name
          </label>
          <div className="inputAnsBoxProfile">
            <input
              name="firstName"
              defaultValue={photographer?.firstName}
              type="text"
              minLength={1}
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent "
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="left-5 relative top-1 text-xs text-red-500">
                Minimum Length is 1
              </span>
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="w-full inputBox">
          <label
            htmlFor="lastName"
            className="font-syne text-[16px] font-medium p-3"
          >
            Last Name
          </label>
          <div className="inputAnsBoxProfile">
            <input
              name="lastName"
              defaultValue={photographer?.lastName}
              type="text"
              minLength={1}
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent "
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="left-5 relative top-1 text-xs text-red-500">
                Minimum Length is 1
              </span>
            )}
          </div>
        </div>

        {/* Studio Name */}
        <div className="w-full inputBox">
          <label
            htmlFor="studioName"
            className="font-syne text-[16px] font-medium p-3"
          >
            Studio Name
          </label>
          <div className="inputAnsBoxProfile">
            <input
              name="studioName"
              defaultValue={photographer.studioName}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent "
              {...register("studioName", { required: true })}
              minLength={3}
            />
            {errors.studioName && (
              <span className="left-5 relative top-1 text-xs text-red-500">
                Minimum Character Should be 3
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBasicInformation;
