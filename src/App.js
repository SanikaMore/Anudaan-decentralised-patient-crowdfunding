// import logo from './logo.svg';
// import './index.css';
import Sidebar from "./Components/Sidebar";
import { ThirdwebProvider, } from "thirdweb/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {Home,Profile,CampaignDetails,CreateCampaign} from "./pages"
import Home from './pages/Home';
import Profile from './pages/Profile';
import CampaignDetails from './pages/CampaignDetails';
import { CreateCampaign } from './pages/CreateCampaign';
import Navbar from './Components/NavBar';
function App() {
  return (
    <ThirdwebProvider>
      <Router>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          {/* <div className='bg-blue-500'>Helll tailwindcssx  </div> */}
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">

            <Navbar />
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
