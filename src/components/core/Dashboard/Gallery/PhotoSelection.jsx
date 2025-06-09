import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import IconButton from '../../../common/IconButton'
import { useSelector } from 'react-redux'
import SelectCustomerModal from './SelectCustomerModal'

const PhotoSelection = () => {
    const {galleryId} = useParams()
    const {gallery} = useSelector((state)=>state.gallery)

    const [selectCustomerModal, setSelectCustomerModal] = useState(false)

    useEffect(()=>{
        console.log("Gallery data is", gallery)
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
            10 Images
          </p>
        </div>

        {/* Add Folder Button */}
        <div className="flex gap-6">
          {gallery?.clientID ? (
            <p className="border-1 rounded-[20px] self-center py-[6px] px-[14px] font-syne text-[28px] text-[rgba(0,0,0,0.8)] font-semibold cursor-pointer">
              {gallery.clientID?.clientName}
            </p>
          ) : (
            <IconButton text={"Add Customer"} onclick = {()=>setSelectCustomerModal(true)}/>
          )}

          <IconButton text={"Add Images"} />
        </div>
      </div>

      {/* Add Folder List */}
      <ul className="w-full px-[150px] font-syne mt-10 grid grid-cols-4 gap-x-30 gap-y-20 pb-10 ">
        {/* {folders?.map((gallery) => (
          <li
            key={gallery._id}
            onClick={() =>
              navigate(`/dashboard/photo-selection/${gallery._id}`)
            }
            className="w-[200px] h-[135px] bg-[linear-gradient(297deg,rgba(255,0,102,0.8)_0.12%,rgba(255,51,132,0.8)_99.88%)] text-2xl text-lightBlack text-center flex justify-center items-center rounded-2xl relative cursor-pointer"
          >
            <p className="px-2">{gallery.galleryName}</p>
            <span className="absolute top-[80%] right-[10%] text-[14px]">
              {gallery.galleryImagesUrl.length} Images
            </span>
          </li>
        ))} */}
      </ul>

      {selectCustomerModal && (
        <SelectCustomerModal setSelectCustomerModal={setSelectCustomerModal} galleryId = {galleryId}/>
      )}
    </section>
  );
}

export default PhotoSelection
