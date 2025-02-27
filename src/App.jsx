import {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import FaqPage from "./pages/FaqPage"
import KelasPage from "./pages/KelasPage"
import SyaratPage from "./pages/SyaratPage"
import TestimonialPage from "./pages/TestimonialPage"


function App() {
  return <div>
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/faq" Component={FaqPage} />
      <Route path="/kelas" Component={KelasPage} />
      <Route path="/syarat" Component={SyaratPage} />
      <Route path="/testimonial" Component={TestimonialPage} />
    </Routes>
  </div>
}

export default App
