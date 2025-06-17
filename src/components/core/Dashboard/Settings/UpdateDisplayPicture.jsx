import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { updateProfilePicture } from '../../../../services/operations/profileAPI'

const UpdateDisplayPicture = () => {
const {photographer} = useSelector((state)=>state.profile)
const {token} = useSelector((state)=>state.auth)

const [displayPicture, setDisplayImage] = useState(null)
const [previewImage, setPreviewImage] = useState(null)

const imageInputRef = useRef(null)
const dispatch = useDispatch()

const handleClick = () => {
    imageInputRef.current.click()
}

const handleImageChange = async(e) => {
    const image = e.target.files[0]

    if(image){
        setDisplayImage(image)
        previewDisplayPicture(image)
        console.log(image)
    }   
}

const previewDisplayPicture = (image) => {
    const reader = new FileReader()

    reader.readAsDataURL(image)

    reader.onloadend = () => {
        setPreviewImage(reader.result)
    }
}

const handleFileUpload = () => {
    const formData = new FormData()
    formData.append("displayPicture", displayPicture)
    dispatch(updateProfilePicture(token, formData))
}

  return (
    <div className="pt-[50px] w-[900px] mx-auto flex flex-col gap-8">
      <h2 className="font-bold font-sunflower text-3xl">Display Picture</h2>

      <div className="w-full flex items-center gap-10">
        <img
          src={previewImage || photographer.image}
          className="h-[80px] w-[80px] rounded-full"
        />
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
        />
        <IconButton text="Update" onclick={handleClick} />
        <IconButton text="Upload" onclick={handleFileUpload} />
      </div>
    </div>
  );
}

export default UpdateDisplayPicture
