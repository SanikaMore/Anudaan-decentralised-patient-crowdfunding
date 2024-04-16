import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
    return (
        <div className="bg-[#1c1c24] text-[#808191] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-6">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-between items-center mb-6">
                {/* Logo and website name */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-2 text-[#42c966]">Patient Assist</h2>
                    <p className="text-sm">A platform built with blockchain technology</p>
                </div>

                {/* Navigation links */}
                {/* <div className="flex flex-col md:flex-row items-center gap-4">
                    <Link to="/about" className="text-sm hover:underline">About Us</Link>
                    <Link to="/faq" className="text-sm hover:underline">FAQ</Link>
                    <Link to="/terms" className="text-sm hover:underline">Terms & Conditions</Link>
                    <Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
                </div> */}

                {/* Contact information */}
<div className="flex flex-col md:flex-column items-left gap-4 m-auto">
    <p className="text-sm">Email<br/>ronak.matolia@spit.ac.in<br/>sanika.more@spit.ac.in<br/>dhanashree.otari@spit.ac.in
    <br/>krishnan.subramanian@spit.ac.in
    <br/>
    </p>
    
    <p className="text-sm">Address<br/>Sardar Patel Institute of Technology,Andheri</p>
</div>


            

                {/* Social media links */}
                <div className="flex gap-4">
                    <a href="https://github.com/krishnan472003/decentralised-patient-crowdfunding" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl hover:text-gray-400" />
                    </a>
                    {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl hover:text-gray-400" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-2xl hover:text-gray-400" />
                    </a> */}
                </div>
            </div>

            {/* Copyright and legal disclaimer */}
            <div className="w-full max-w-screen-lg text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Patient Asist. All rights reserved.</p>
                <p className="text-xs mt-2">Remember, while this platform aims to support 
                individuals in their healthcare journey, it's essential to consult qualified medical professionals
                 for personalized advice. We're here to provide a crowdfunding platform to assist patients in 
                 accessing the care they need, but nothing replaces the guidance of trained healthcare providers.
                  If you're facing medical challenges, we encourage you to reach out to your physician or healthcare team 
                  for tailored support and advice.</p>
            </div>
        </div>
    );
}

export default Footer;
