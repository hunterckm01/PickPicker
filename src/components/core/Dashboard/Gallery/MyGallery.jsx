import React, { useEffect, useState } from 'react'
import IconButton from '../../../common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFolders } from '../../../../services/operations/photographerAPI';
import { useNavigate } from 'react-router';
import { setGallery } from '../../../../slices/gallerySlice';
import GalleryModal from './GalleryModal';

const MyGallery = () => {
  const {token} = useSelector((state)=>state.auth)
  const {folders} = useSelector((state)=>state.gallery)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [galleryModal, setGalleryModal] = useState(false)

  useEffect(()=>{
    function fetchFolders(){
      dispatch(getAllFolders(token))
      // console.log("Folders got are", folders)
    }
    fetchFolders()
  },[])

  useEffect(()=>{
    console.log("Folders are", folders)
  },[folders])

  const selectGallery = (gallery, galleryId) => {
    // console.log("gallery data is", JSON.stringify(gallery))
    localStorage.setItem("gallery", JSON.stringify(gallery))
    dispatch(setGallery(gallery))
    navigate(`/dashboard/photo-selection/${galleryId}`);
  }

  return (
    <section className="w-full min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]">
      <div className="flex justify-between pt-[50px] px-[120px]">
        {/* No of Folders */}
        <div className="flex flex-col ">
          <p className="font-sunflower text-[36px] font-bold tracking-[1.8px]">
            Folder Selection
          </p>
          <p className="font-tw font-normal tracking-[3px] text-[30px] text-[#A19999] mt-[-10px]">
            {folders.length} Folders
          </p>
        </div>

        {/* Add Folder Button */}
        <IconButton
          text={"Add Folder"}
          onclick={() => setGalleryModal(true)}
        />
      </div>

      {/* Add Folder List */}
      <ul className="w-full px-[150px] font-syne mt-10 grid grid-cols-4 gap-x-30 gap-y-20 pb-10 ">
        {folders?.map((gallery) => (
          <li key = {gallery._id} onClick = {()=>selectGallery(gallery, gallery._id)} className="w-[200px] h-[135px] bg-[linear-gradient(297deg,rgba(255,0,102,0.8)_0.12%,rgba(255,51,132,0.8)_99.88%)] text-2xl text-lightBlack text-center flex justify-center items-center rounded-2xl relative cursor-pointer">
            <p className='px-2 text-xl'>
              {gallery.galleryName}
            </p>
            <span className='absolute top-[80%] right-[10%] text-[14px]'>{gallery.galleryImagesUrl.length} Images</span>
          </li>
        ))}
      </ul>

      {
        galleryModal && (
          <GalleryModal setGalleryModal = {setGalleryModal}
          token = {token}
          />
        )
      }
    </section>
  );
}

export default MyGallery
