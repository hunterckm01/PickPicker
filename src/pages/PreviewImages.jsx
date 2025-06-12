import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { downloadGallery, previewGallery } from '../services/operations/photographerAPI';
import IconButton from '../components/common/IconButton';

const PreviewImages = () => {
    const {id: galleryId} = useParams() ;
    const query = new URLSearchParams(useLocation().search)
    const code = query.get("code")
    const [images, setImages] = useState([])
    // const [err, setErr] = useState("")



    useEffect(()=>{
        const getImages = async() => {
            const response = await previewGallery(galleryId, code)
            console.log("Response is", response)
            setImages(response.images)
        }
        getImages()
    },[galleryId, code])

  return (
    <div className="min-h-[100vh] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]">
      <div className="pt-[50px] flex justify-between w-full pr-[100px]">
        <h1 className="text-center font-bold text-5xl ml-[40%] font-sunflower">Your Fav Images</h1>

        <IconButton text={"Download"} onclick={()=>downloadGallery(galleryId)}/>
      </div>
      <div className="px-[100px] font-syne mt-10 grid grid-cols-5 gap-x-12 gap-y-16 pb-10 pt-[50px]">
        {images.map((url) => (
          <img
            key={url}
            src={url}
            alt="image"
            className="rounded-md h-[300px] w-[400px]"
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewImages
