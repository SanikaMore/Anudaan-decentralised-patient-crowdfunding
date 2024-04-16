import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sun } from '../assets';
import { navlinks } from '../constants';


import {
    ThirdwebProvider,
    ConnectButton,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID,
    secretKey: process.env.REACT_APP_SECRET_KEY,
});

const wallets = [createWallet("io.metamask")];

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt="fund_logo"
      className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
    />
  </div>
);

const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');

    return (
        <div className="w-full flex justify-between  sticky top-0 h-[100px] bg-[#1c1c24] rounded-[20px] p-4 " >
            {/* Left section with text */}
            <div className="text-center text-2xl font-bold text-[#42c966] mr-auto" onClick={()=>{navigate('/')}} style={{textAlign: 'center'}}>
    <div>Patient</div>
    <div>Assist</div>
</div>


            {/* Middle section with icons */}
            <div className="flex space-x-12 items-center">
                {navlinks.map((link) => (
                    <Icon 
                        key={link.name}
                        {...link}
                        isActive={isActive}
                        handleClick={() => {
                            if (!link.disabled) {
                                setIsActive(link.name);
                                navigate(link.link);
                            }
                        }}
                    />
                ))}
            </div>

            {/* Right section with ConnectButton */}
            <div className="ml-auto">

              <ConnectButton
                client={client}
                wallets={wallets}
                theme="dark"
                connectModal={{ size: "wide" }}
                styles={{
                
                }}
            />

            </div>
            
        </div>
    );
};

export default Sidebar;


//export default Sidebar;
