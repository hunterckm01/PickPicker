import React from 'react'
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import { setLoading } from '../../../slices/authSlice';
import { login } from '../../../services/operations/authAPI';
import { setLoading } from '../../../slices/profileSlice';

const PhotographerLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()

  

  const onSubmit = async(data) => {
    console.log("Login Frontend")
    const formData = new FormData()

    formData.append("email", data.email)
    formData.append("password", data.password)

    dispatch(setLoading(true))
    dispatch(login(formData, navigate))
    
    // dispatch(setPhotographer(photographerData))
    dispatch(setLoading(false))
  }

  return (
    <section
      className="relative bg-[linear-gradient(120deg,_#c8a0ffb3_10%,_#6496ff80_100%)]
 w-screen min-h-[calc(100vh-131px)]"
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
          className="flex flex-col gap-5 mx-auto w-[782px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Back Button */}
          <button className="moveButton" onClick={()=>navigate(-1)}>
            <FaArrowLeft className="text-3xl" />
          </button>

          <div className="w-full inputBox">
            <label
              htmlFor="email"
              id="email"
              className="font-syne text-[16px] font-medium p-3"
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
                className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
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
              className="font-syne text-[16px] font-medium p-3"
            >
              Password
            </label>
            <div className="inputAnsBox">
              <input
                type="password"
                id="password"
                placeholder="Asdsfsd112"
                className="font-syne relative left-5 text-[16px] font-medium w-[calc(100%-40px)] outline-none focus:outline-none focus:ring-0"
                {...register("password", {required: true})}
              />
              {errors.password && (
                <span className="mt-2 text-xs text-red-500">
                  Password is Required
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
}

export default PhotographerLogin
