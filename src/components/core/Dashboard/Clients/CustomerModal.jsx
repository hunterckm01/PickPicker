import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { createClient, getAllClient, updateClient } from '../../../../services/operations/photographerAPI';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setEditClient } from '../../../../slices/clientSlice';
import { RxUpdate } from 'react-icons/rx';

const CustomerModal = ({ setCustomerModal, token, editClient }) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {client} = useSelector((state)=>state.clients)
  // const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log("Edit Client is", editClient)
    if(editClient){
      setValue('name', client.clientName)
      setValue('phoneNumber', client.clientNumber)
    }
  },[])

  const isFormUpdated = () => {
    const currentValues = getValues() ;
    console.log("Current Values are", currentValues)
    if(currentValues.name !== client.clientName ||
      currentValues.phoneNumber !== client.clientNumber
    ){
      return true ;
    }
    return false ;
  }

  const customerSubmit = async (data) => {
    // If Edit Client is true Update the form
    if(editClient){
      console.log("is form updated",isFormUpdated())
      if(isFormUpdated()){
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("clientId", client._id)
        if (currentValues.name !== client.clientName) {
          formData.append("clientName", data.name);
        }
        if (currentValues.phoneNumber !== client.clientNumber) {
          formData.append("clientNumber", data.phoneNumber);
        }
        console.log("Form data is", formData)
        await updateClient(formData, token)
      }
      else{
        toast.error("No Changes in the client")
      }
      dispatch(getAllClient(token))
      dispatch(setEditClient(false))
      setCustomerModal(false)
      return ;
    }
    const formData = new FormData();
    formData.append("clientName", data.name);
    formData.append("clientNumber", data.phoneNumber);

    await createClient(formData, token);
    dispatch(getAllClient(token))
    setCustomerModal(false);
  };

  return (
    <div className="fixed h-screen w-screen inset-0 backdrop-blur-[5px] flex items-center justify-center">
      <div className="w-[350px] sm:w-[510px] border-1 border-[rgba(0,0,0,0.2)] rounded-xl px-2 pt-2 pb-4 sm:pr-5 sm:pl-10 sm:pb-12 sm:pt-5 bg-[linear-gradient(297deg,rgba(255,0,102,0.6)_0.12%,rgba(255,51,132,0.6)_99.88%)] font-normal">
        <form
          className="flex flex-col font-syne"
          onSubmit={handleSubmit(customerSubmit)}
        >
          <div className="flex justify-between w-full mb-5">
            <p className="text-[14px] sm:text-[28px] text-lightBlack self-center ">
              {editClient ? "Edit Client" : "Add Client"}
            </p>
            <div className="flex gap-2">
              {editClient ? ( //Edit Client Button
                <button className="self-end rounded-full  ">
                  <RxUpdate className="h-[15px] w-[15px] sm:h-[30px] sm:w-[30px]" />
                </button>
              ) : (
                //Create New Client Button
                <button className="self-end rounded-full border-2 border-lightBlack ">
                  <IoMdAdd className="h-[15px] w-[15px] sm:h-[30px] sm:w-[30px]" />
                </button>
              )}
              <button
                className="self-end rounded-full border-2 border-lightBlack"
                onClick={() => {
                  dispatch(setEditClient(false));
                  setCustomerModal(false);
                }}
              >
                <IoCloseSharp className="h-[15px] w-[15px] sm:h-[30px] sm:w-[30px]" />
              </button>
            </div>
          </div>

          <label id="name" className="flex flex-col">
            <input
              id="name"
              type="text"
              placeholder="name"
              className="bg-[rgba(255,255,255,0.1)] text-lg sm:text-2xl pl-2 border-1 border-[rgba(255,255,255,0.1)] rounded-[10px] w-[320px] sm:w-[404px] py-2"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="inputError">Name is required</span>
            )}
          </label>

          <label id="phoneNumber" className="flex flex-col">
            <input
              id="phoneNumber"
              placeholder="phone no"
              className="bg-[rgba(255,255,255,0.1)] text-lg sm:text-2xl pl-2 border-1 border-[rgba(255,255,255,0.1)] rounded-[10px] mt-[24px] w-[320px] sm:w-[404px] py-2"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Only 10 Numbers are allowed",
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="inputError">{errors.phoneNumber.message}</span>
            )}
          </label>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal
