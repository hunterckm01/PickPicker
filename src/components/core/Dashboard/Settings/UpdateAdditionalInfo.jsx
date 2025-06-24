import React, { useEffect } from 'react'
import { Form, useForm } from 'react-hook-form';
import IconButton from '../../../common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdditionalProfile } from '../../../../services/operations/profileAPI';

const UpdateAdditionalInfo = () => {
    const {photographer} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch()

    const gender = ["Male", "Female", "Others"]

    const onSubmit = async(data) => {
        const formData = new FormData()

        formData.append("about", data.about)
        formData.append("dateOfBirth", data.dob)
        formData.append("contactNumber", data.contactNumber)
        formData.append("gender", data.gender)

        dispatch(updateAdditionalProfile(token, formData))
    }

    useEffect(()=>{
        console.log("Photographer details is", photographer)
    },[])
  return (
    <div className="pt-[50px] w-[330px] sm:w-[600px] lg:w-[900px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl sm:text-3xl font-sunflower">
          Additional Information
        </h2>

        <IconButton text="Update" onclick={handleSubmit(onSubmit)} />
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {/* About */}
        <div className="w-full inputBox">
          <label
            htmlFor="about"
            className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            About
          </label>
          <div className="inputAnsBoxProfile flex flex-col">
            <textarea
              name="about"
              placeholder="No Bio"
              defaultValue={photographer.additionalDetails.about}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent"
              {...register("about", {
                pattern: {
                  value: /^[a-zA-Z!'";: ]{3,50}$/,
                  message: "Your Bio is either too short",
                },
              })}
            />
            {errors.about && (
              <span className="left-5 relative top-1 text-xs text-red-500">
                {errors.about.message}
              </span>
            )}
          </div>
        </div>

        {/* Contact Number */}
        <div className="w-full inputBox self-start">
          <label
            htmlFor="contactNumber"
            className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            Phone No.
          </label>
          <div className="inputAnsBoxProfile  flex flex-col">
            <input
              name="contactNumber"
              placeholder="No Number"
              defaultValue={photographer.additionalDetails.contactNumber}
              type="text"
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent"
              {...register("contactNumber", {
                pattern: {
                  value: /^\d{10}$/,
                  message: "Only 10 Numbers are allowed",
                },
              })}
            />
            {errors.contactNumber && (
              <span className="left-5 relative top-1 text-xs text-red-500">
                {errors.contactNumber.message}
              </span>
            )}
          </div>
        </div>

        {/* Date Of Birth Name */}
        <div className="w-full inputBox">
          <label
            htmlFor="dob"
            className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            Date Of Birth
          </label>
          <div className="inputAnsBoxProfile">
            <input
              name="dob"
              defaultValue={photographer.additionalDetails.dateOfBirth || "DOB"}
              type="date"
              minLength={1}
              className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0 text-slate-500 bg-transparent "
              {...register("dob")}
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
            htmlFor="gender"
            className="w-[40%] sm:w-fit font-syne text-[12px] sm:text-[16px] font-medium p-3"
          >
            Gender
          </label>
          <div className="inputAnsBoxProfile">
            <select
              name="gender"
              defaultValue={photographer.additionalDetails.gender}
              {...register("gender")}
            >
              {gender.map((ele, index) => (
                <option key={index}>{ele}</option>
              ))}
            </select>
            {errors.lastName && (
              <span className="left-5 relative top-1 text-xs text-red-500">
                Minimum Length is 1
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateAdditionalInfo
