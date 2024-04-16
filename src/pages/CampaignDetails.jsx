import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CountBox from '../Components/CountBox';
import CustomButton from '../Components/CustomButton';
import Loader from '../Components/Loader';
// import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils/index.js';
import { thirdweb } from '../assets';
import { useActiveAccount } from "thirdweb/react";
import { readContract, resolveMethod,prepareContractCall, sendTransaction,createThirdwebClient,getContract, toWei } from "thirdweb";
import {ethers} from "ethers"
import {sepolia} from "thirdweb/chains"
 
const getDonations = async (pId,contract) => {
  // const donations = await contract.call('getDonators', [pId]);
  console.log("a")
  console.log(contract)
  console.log("a")
  

  const donations = await readContract({ 
    contract, 
    method: resolveMethod("getDonators"), 
    params: [pId] 
  })
  console.log(donations)

  const numberOfDonations = donations[0].length;

  const parsedDonations = [];
  if(donations){
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.formatEther(donations[1][i].toString())
      })
    }

  }

  return parsedDonations;
}

const donate = async (pId, amount,contract,account) => {
  // const contract = new ethers.Contract(contractAddress, contractABI, provider); // Assuming you have ethers.js provider configured

  try {
    const transaction = await prepareContractCall({ 
      contract, 
      method: resolveMethod("donateToCampaign"), 
      params: [pId],
      value:toWei(amount)
    });

    // Wait for transaction confirmation
    const { transactionHash } = await sendTransaction({ 
      transaction, 
      account 
    })
    console.log(transactionHash)
  } catch (error) {
    console.error("Error donating to campaign:", error);
  }
}



const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const address = useActiveAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  // const [contract, SetContract] = useState(null);
  const remainingDays = daysLeft(state.deadline);
  const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID,
    secretKey: process.env.REACT_APP_SECRET_KEY,
});
  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.REACT_APP_CONTRACT
  })
  const fetchDonators = async () => {
   
    console.log(state.pId)
    const data = await getDonations(state.pId,contract);
    setDonators(data);
  }

  useEffect(() => {

    if (address) fetchDonators();
  }, [address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount,contract,address);

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                {/* <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p> */}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails