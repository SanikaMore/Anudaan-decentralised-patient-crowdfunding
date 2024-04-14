import React, { useState, useEffect } from 'react'
import {useActiveAccount} from 'thirdweb/react'
import  DisplayCampaigns  from '../Components/DisplayCampaigns';
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient, readContract,getContract, resolveMethod } from "thirdweb";
import {ethers} from 'ethers'

const getCampaigns = async (contract) => {
  // const campaigns = await contract.call('getCampaigns');
  const campaigns =await readContract({
    contract,
    method: resolveMethod("getCampaigns"),
    params: []
  });
  console.log(campaigns)
  const parsedCampaings = campaigns.map((campaign, i) => ({
    owner: campaign.owner,
    billNo: campaign.billNo,
    title: campaign.patientName,
    description: campaign.description,
    target: ethers.formatEther(campaign.target.toString()),
    deadline: String(campaign.deadline),
    amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
    image: campaign.image,
    pId: i
  }));

  return parsedCampaings;
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const address = useActiveAccount();

  const fetchCampaigns = async () => {
    const client = createThirdwebClient({
      clientId: process.env.REACT_APP_CLIENT_ID,
      secretKey: process.env.REACT_APP_SECRET_KEY,
  });
  
  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.REACT_APP_CONTRACT
  })
    setIsLoading(true);
    if(address){
      console.log(address)
      const data = await getCampaigns(contract);
      setCampaigns(data);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if(address)  fetchCampaigns();
  }, [address]);

  return (
    <>
    {/* <div >{address}</div> */}
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
    </>
  )
}

export default Home