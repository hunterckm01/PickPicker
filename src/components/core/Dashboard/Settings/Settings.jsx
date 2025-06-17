import React from 'react'
import UpdateDisplayPicture from './UpdateDisplayPicture';
import UpdateBasicInformation from './UpdateBasicInformation';
import UpdateAdditionalInfo from './UpdateAdditionalInfo';
import DeleteAccount from './DeleteAccount';

const Settings = () => {
  return (
    <div className="w-screen min-h-[calc(100vh-131px)] bg-[linear-gradient(103deg,_#efdaffc0_2.13%,_#b458ff8f_104.3%)]">

          {/* Update display picture */}
          <UpdateDisplayPicture/>

          {/* Update the basic information */}
          <UpdateBasicInformation/>

          {/* Update the additional Information */}
          <UpdateAdditionalInfo/>

          {/* Delete Account */}
          <DeleteAccount/>
        
    </div>
  );
}

export default Settings
