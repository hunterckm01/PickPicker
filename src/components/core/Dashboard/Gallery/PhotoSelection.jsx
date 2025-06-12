import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import IconButton from '../../../common/IconButton'
import { useSelector } from 'react-redux'
import SelectCustomerModal from './SelectCustomerModal'
import { addImagesToGallery, deleteGallery, shareCode } from '../../../../services/operations/photographerAPI'
import toast from 'react-hot-toast'

const PhotoSelection = () => {
    const {galleryId} = useParams()
    const {token} = useSelector((state)=>state.auth)
    const {gallery} = useSelector((state)=>state.gallery)
    const navigate = useNavigate()

    const [selectCustomerModal, setSelectCustomerModal] = useState(false)

    const share = async() => {
      console.log("Share function is hit")
      const data = await shareCode(galleryId)
      console.log("Data is", data)
      navigator.clipboard.writeText(data.link)
      toast.success("Link copied Successfully")
    }

    const fileInputRef = useRef(null)

    const handleButtonClick = () => {
      if(fileInputRef.current){
        fileInputRef.current.click()
      }
    }

    const handleFilesUpload = async(e) => {
      const files = e.target.files;
      console.log("Files selected are", files)
      const formData = new FormData()
      formData.append("galleryId", galleryId)

      for(let i = 0 ; i < files.length; i++){
        formData.append("imageGallery", files[i])
      }
      console.log("Before sending data to server", formData)
      await addImagesToGallery(formData, token)
    }

    const deleteFolder = async() => {
      // console.log("Gallery id is", galleryId)
      await deleteGallery(galleryId, token)
      navigate("/dashboard/photo-selection")
    }

    useEffect(()=>{
        console.log("Gallery data is", gallery?.galleryImagesUrl.length)
    },[])

  return (
    <section className="w-full min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]">
      <div className="flex justify-between pt-[50px] px-[120px]">
        {/* No of Folders */}
        <div className="flex flex-col ">
          <p className="font-sunflower text-[36px] font-bold tracking-[1.8px]">
            Image Selection
          </p>
          <p className="font-tw font-normal tracking-[3px] text-[30px] text-[#A19999] mt-[-10px]">
            {gallery?.galleryImagesUrl.length ? gallery?.galleryImagesUrl.length : "0"} Images
          </p>
        </div>

        {/* Add Customer to the folders */}
        <div className="flex gap-6">
          {gallery?.clientID ? (
            <p className="border-1 rounded-[20px] self-center py-[6px] px-[14px] font-syne text-[28px] text-[rgba(0,0,0,0.8)] font-semibold cursor-pointer">
              {gallery.clientID?.clientName}
            </p>
          ) : (
            <IconButton
              text={"Add Customer"}
              onclick={() => setSelectCustomerModal(true)}
            />
          )}

          {
            !gallery?.galleryImagesUrl.length>0 ? (<div className='flex items-center'>
              <button className="border-1 rounded-[20px] self-center py-[6px] px-[14px] font-syne text-[28px] text-[rgba(0,0,0,0.8)] cursor-pointer"
              onClick={handleButtonClick}
              >
                Add Images
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                ref = {fileInputRef}
                onChange={handleFilesUpload}
                style={{ display: "none" }}
              />
            </div>) : (<></>)
          }
          
          <IconButton text = {"Delete Gallery"} onclick={deleteFolder}/>

          <IconButton text = {"Share Code"} onclick={share}/>
        </div>
      </div>

      {/* Add Folder List */}
      <ul className="w-full px-[150px] font-syne mt-10 grid grid-cols-5 gap-x-12 gap-y-16 pb-10 ">
        {gallery?.galleryImagesUrl?.map((image, index) => (
          <img src = {image} className = "h-[300px] w-[400px]" key = {index}/>
        ))}
      </ul>

      {selectCustomerModal && (
        <SelectCustomerModal
          setSelectCustomerModal={setSelectCustomerModal}
          galleryId={galleryId}
        />
      )}
    </section>
  );
}

export default PhotoSelection
