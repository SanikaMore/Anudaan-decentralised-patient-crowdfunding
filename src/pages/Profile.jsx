import React, { useState, useEffect } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import DisplayCampaigns from '../Components/DisplayCampaigns';
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient, readContract, getContract, resolveMethod } from "thirdweb";
import { ethers } from 'ethers'


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


  const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address.address);

  return filteredCampaigns;
}

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const address = useActiveAccount();
  const client = createThirdwebClient({
    clientId: "43e7eaab7fe66f54376971e735ecd535",
    secretKey: "8r_h7edsBBz6iu3Oown8VwylXQaXMA37ZflVWzxwIQmQGzuaUe7NRdyyy94Xb7I90ftsgGU5aUx_88gXxQgNng"
});

  const contract = getContract({
    client,
    chain: sepolia,
    address: "0x64b9D2c681Be2C0eA935e85B22D810e4DfBbdEaD"
  });
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