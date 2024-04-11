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
    title: campaign.title,
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
      clientId: "43e7eaab7fe66f54376971e735ecd535",
      secretKey: "8r_h7edsBBz6iu3Oown8VwylXQaXMA37ZflVWzxwIQmQGzuaUe7NRdyyy94Xb7I90ftsgGU5aUx_88gXxQgNng"
    });
  
    const contract = getContract({
      client,
      chain: sepolia,
      address: "0x64b9D2c681Be2C0eA935e85B22D810e4DfBbdEaD"
    });
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