import {Routes, Route} from "react-router-dom"

import NavBarComponent from "./components/NavBarComponent"
// import FooterComponent from "./components/FooterComponent"

import CoffeeExplorer from './components/CoffeeExplorer';
import CoffeeImageCarousel from './components/CoffeeImageCarousel';

import HomePage from "./pages/HomePage"
import FaqPage from "./pages/FaqPage"
import KelasPage from "./pages/KelasPage"
import SyaratPage from "./pages/SyaratPage"




function App() {
  return (
  <div>
   <NavBarComponent/>

    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/racik" Component={FaqPage} />
      <Route path="/explore" Component={KelasPage} />
      <Route path="/cari" Component={SyaratPage} />
    </Routes>

    {/* <FooterComponent/> */}

    <CoffeeExplorer />
    <CoffeeImageCarousel />
  </div>

  
  );
}

export default App
