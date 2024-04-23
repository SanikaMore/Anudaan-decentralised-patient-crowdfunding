// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string patientName;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        string billNo;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _billNo,
        string memory _patientName,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.patientName = _patientName;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.billNo = _billNo;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        require(_id < numberOfCampaigns, "Invalid campaign ID");
        require(
            campaign.amountCollected < campaign.target,
            "Target amount already reached."
        );

        uint256 remainingAmount = campaign.target - campaign.amountCollected;

        // Check if the new donation exceeds the remaining amount needed
        if (amount > remainingAmount) {
            uint256 surplusAmount = amount - remainingAmount;

            (bool sent, ) = payable(msg.sender).call{value: surplusAmount}("");
            require(sent, "Failed to send surplus amount back to sender.");

            (bool sentOwner, ) = payable(msg.sender).call{
                value: remainingAmount
            }("");
            require(sentOwner, "Failed to send donation to campaign owner.");

            campaign.amountCollected += remainingAmount;
        } else {
            // No surplus amount, just add the full donation
            (bool sent, ) = payable(campaign.owner).call{value: amount}("");
            require(sent, "Failed to send donation to campaign owner.");

            campaign.amountCollected += amount;
        }

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory validCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            validCampaigns[i] = item;
        }

        return validCampaigns;
    }
}
