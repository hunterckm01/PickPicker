import React from 'react'

const IconButton = ({text, onclick, customCss}) => {
  return (
    <button 
    onClick = {onclick}
    className={`border-1 rounded-[20px]  py-[6px] px-[14px] font-syne text-[28px] text-[rgba(0,0,0,0.8)] cursor-pointer ${customCss} `}
    //Add self-start if issue arises anywhere 
    >
      {text}
    </button>
  );
}

export default IconButton
