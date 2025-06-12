import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { previewGallery } from '../services/operations/photographerAPI';

const PreviewImages = () => {
    const {id: galleryId} = useParams() ;
    const query = new URLSearchParams(useLocation().search)
    const code = query.get("code")
    const [images, setImages] = useState([])
    const [err, setErr] = useState("")

    useEffect(()=>{
        const getImages = async() => {
            const response = await previewGallery(galleryId, code)
            console.log("Response is", response)
            setImages(response.images)
        }
        getImages()
    },[galleryId, code])

  return (
    <div className="min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]">
      <h1 className='text-center pt-[50px] font-bold text-3xl'>Your Fav Images</h1>
      <div className="px-[100px] font-syne mt-10 grid grid-cols-5 gap-x-12 gap-y-16 pb-10 pt-[50px">
        {images.map((url) => (
          <img
            key={url}
            src={url}
            alt="image"
            className="rounded h-[300px] w-[400px]"
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewImages
