import React from 'react';
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import Navbar from './Components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CampaignDetails from './pages/CampaignDetails';
import { CreateCampaign } from './pages/CreateCampaign';
import Footer from './Components/Footer';

function App() {
  return (
    <ThirdwebProvider>
      <Router>
        <div className=" p-4 bg-[#13131a] min-h-screen flex flex-col sm:flex-row">
          
          

          <div className="flex-1 w-full ">
            {/* Navbar component */}
            {/* <Navbar /> */}
            <div className="sm:flex hidden w-full">
            {/* Sidebar component at the top */}
            <Sidebar />
          </div>
            
            <div className=" my-2 w-full">
              {/* Routes component */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-campaign" element={<CreateCampaign />} />
                <Route path="/campaign-details/:id" element={<CampaignDetails />} />
              </Routes>
            </div>

            <div>
             
             <Footer/>

            </div>
          </div>

        </div>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
