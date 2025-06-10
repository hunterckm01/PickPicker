import React from 'react'
import { useForm } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

const GalleryModal = () => {

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const folderSubmit = async(data) => {

    }

  return (
    <div className="fixed h-screen w-screen inset-0 backdrop-blur-[5px] flex items-center justify-center">
      <div className="w-[510px] border-1 border-[rgba(0,0,0,0.2)] rounded-xl pr-5 pl-10 pb-12 pt-5 bg-[linear-gradient(297deg,rgba(255,0,102,0.6)_0.12%,rgba(255,51,132,0.6)_99.88%)] font-normal">
        <form
          className="flex flex-col font-syne"
          onSubmit={handleSubmit(folderSubmit)}
        >
          <div className="flex justify-between w-full mb-5">
            <p className="text-[28px] text-lightBlack self-center ">
              {/* {editClient ? "Edit Client" : "Add Client"} */}
              Add Folder
            </p>
            <div className="flex gap-2">
              <button className="self-end rounded-full border-2 border-lightBlack ">
                <IoMdAdd className="h-[30px] w-[30px]" />
              </button>
              {/* {editClient ? ( //Edit Client Button
                   <button className="self-end rounded-full  ">
                     <RxUpdate className="h-[30px] w-[30px]" />
                   </button>
                 ) : ( //Create New Client Button
                   <button className="self-end rounded-full border-2 border-lightBlack ">
                     <IoMdAdd className="h-[30px] w-[30px]" />
                   </button>
                 )} */}
              <button
                className="self-end rounded-full border-2 border-lightBlack"
                onClick={() => {
                  dispatch(setEditClient(false));
                  setCustomerModal(false);
                }}
              >
                <IoCloseSharp className="h-[30px] w-[30px]" />
              </button>
            </div>
          </div>

          <label id="name">
            <input
              id="name"
              type="text"
              placeholder="name"
              className="bg-[rgba(255,255,255,0.1)] text-2xl pl-2 border-1 border-[rgba(255,255,255,0.1)] rounded-[10px] w-[404px] py-2"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="inputError">Name is required</span>
            )}
          </label>

          <label id="phoneNumber">
            <input
              id="phoneNumber"
              placeholder="phone no"
              className="bg-[rgba(255,255,255,0.1)] text-2xl pl-2 border-1 border-[rgba(255,255,255,0.1)] rounded-[10px] mt-[24px] w-[404px] py-2"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span className="inputError">Customer Number is Required</span>
            )}
          </label>
        </form>
      </div>
    </div>
  );
}

export default GalleryModal
