import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { addClientToGallery, getAllClient, getGalleryDetails } from '../../../../services/operations/photographerAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { setGallery } from '../../../../slices/gallerySlice';

const SelectCustomerModal = ({setSelectCustomerModal, galleryId}) => {
    const {register, setValue, getValues, handleSubmit, formState: {errors}} = useForm();
    const {clients} = useSelector(state =>state.clients)
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    const selectClient = async(data) => {
        const formData = new FormData()

        console.log("Form data is", data)
        formData.append("clientId", data.client)
        formData.append("galleryId", galleryId)

        await addClientToGallery(formData, token)
        setSelectCustomerModal(false)
        const gallery = await getGalleryDetails(galleryId, token)
        console.log("Gallery Data is", gallery)
        dispatch(setGallery(gallery))
    }

  return (
    <section className="fixed h-screen w-screen inset-0 backdrop-blur-[5px] flex items-center justify-center">
      <div className="w-[510px] border-1 border-[rgba(0,0,0,0.2)] rounded-xl pr-5 pl-5 pb-6 pt-5 bg-[linear-gradient(297deg,rgba(255,0,102,0.6)_0.12%,rgba(255,51,132,0.6)_99.88%)] font-normal flex items-center justify-center">
        <form
          className="flex flex-col font-syne w-full"
          onSubmit={handleSubmit(selectClient)}
        >
          <div className="flex justify-between w-full mb-5">
            <p className="text-[28px] text-lightBlack self-center">
              Choose Client
            </p>
            <div className="flex gap-2">
              {/* Choose Client Add button to the folder */}
              <button className="self-end rounded-full border-2 border-lightBlack">
                <IoMdAdd className="h-[30px] w-[30px]" />
              </button>

              <button
                className="self-end rounded-full border-2 border-lightBlack"
                onClick={() => {
                    setSelectCustomerModal(false)
                }}
              >
                <IoCloseSharp className="h-[30px] w-[30px]" />
              </button>
            </div>
          </div>

          <label id="selectClient">
            <select
              id="selectClient"
              className="flex flex-col w-[404px] text-2xl pl-1 bg-[rgba(255,255,255,0.1)] border-1 border-[rgba(255,255,255,0.1)] rounded-[10px] py-2 "
              {...register("client", {required: true})}
            >
              <option className="text-xl pb-2" disabled>
                Select Customers
              </option>
              {
                clients?.map((client)=>(
                    <option className = "text-xl" key = {client._id} value = {client._id}>{client?.clientName}</option>
                ))
              }
            </select>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SelectCustomerModal
