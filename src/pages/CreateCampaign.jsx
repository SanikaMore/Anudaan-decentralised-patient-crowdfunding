import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useActiveAccount } from "thirdweb/react"
import { money } from '../assets';
import { sepolia } from "thirdweb/chains";
import CustomButton from '../Components/CustomButton';
import FundCard from '../Components/FundCard';
import FormField from '../Components/FormField';
import { createThirdwebClient, getContract, prepareContractCall, resolveMethod, sendTransaction } from "thirdweb";
import Loader from '../Components/Loader';
import { checkIfImage } from '../utils';

const createCampaign = async (form, account,contract  ) => {
  try {

    const transaction = await prepareContractCall({
      contract,
      method: resolveMethod("createCampaign"),
      params: [
        account.address,
        form.billNo,
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime()/1000, // deadline,
        form.image,
      ]
    });
    const { transactionHash } = await sendTransaction({account,transaction});
    console.log("contract call success", transactionHash)
  } catch (error) {

    console.log("contract call failure", error)
  }
}

export const CreateCampaign = () => {
 
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (activeAccount) {
      console.log(activeAccount)
    }
  }, [activeAccount]);

  const [form, setForm] = useState({
    name: '',
    billNo: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = createThirdwebClient({
      clientId: process.env.REACT_APP_CLIENT_ID,
      secretKey: process.env.REACT_APP_SECRET_KEY,
  });
  
  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.REACT_APP_CONTRACT
  })
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)

        if(activeAccount) await createCampaign({ ...form, target: ethers.parseUnits(form.target, 18) }, activeAccount, contract)
        else throw new Error("NO acc")
        setIsLoading(false);
        // navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Patient Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Disease Name *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
          <FormField
            labelName="Patient Bill No *"
            placeholder="Bill No"
            inputType="text"
            value={form.billNo}
            handleChange={(e) => handleFormFieldChange('billNo', e)}
          />
        </div>

        <FormField
          labelName="Personal Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}
