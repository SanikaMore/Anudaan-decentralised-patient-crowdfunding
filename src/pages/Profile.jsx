import React, { useState, useEffect } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import DisplayCampaigns from '../Components/DisplayCampaigns';
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient, readContract, getContract, resolveMethod } from "thirdweb";
import { ethers } from 'ethers'
import moment from 'moment';

const getUserCampaigns = async (address, contract) => {
  const campaigns = await readContract({
    contract,
    method: resolveMethod("getCampaigns"),
    params: []
  });
  console.log(campaigns)
  const allCampaigns = campaigns.map((campaign, i) => ({
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


  let filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address.address);
  filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.deadline > moment() && campaign.amountCollected < campaign.target);


  return filteredCampaigns;
}

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const address = useActiveAccount();
  const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID,
    secretKey: process.env.REACT_APP_SECRET_KEY,
});

const contract = getContract({
  client,
  chain: sepolia,
  address: process.env.REACT_APP_CONTRACT
})
  const fetchCampaigns = async () => {
    setIsLoading(true);
    console.log(contract)
    console.log(address)

    if (contract && address) {
      const data = await getUserCampaigns(address, contract);
      setCampaigns(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {

    if (contract && address) fetchCampaigns();
  }, [address]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile