import React from 'react'

const IconButton = ({text, onclick, customCss}) => {
  return (
    <button 
    onClick = {onclick}
    className={`border-1 rounded-[8px] sm:rounded-[20px] py-[3px] sm:py-[6px] px-[6px] sm:px-[14px] font-syne text-[14px] sm:text-[28px] text-[rgba(0,0,0,0.8)] cursor-pointer ${customCss} self-center`}
    //Add self-start if issue arises anywhere 
    >
      {text}
    </button>
  );
}

export default IconButton
