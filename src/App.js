// import logo from './logo.svg';
import './App.css';

import { ThirdwebProvider, } from "thirdweb/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {Home,Profile,CampaignDetails,CreateCampaign} from "./pages"
import Home from './pages/Home';
import Profile from './pages/Profile';
import CampaignDetails from './pages/CampaignDetails';
import {CreateCampaign} from './pages/CreateCampaign';
import Navbar from './Components/NavBar';
function App() {
  return (
    <>
  <ThirdwebProvider>
  <Navbar/>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </Router>
      </ThirdwebProvider>
    </>
  );
}

export default App;
