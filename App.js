import Home from "./home";
import Invisiblewatermark from "./invisiblewatermark";
import Keygeneration from "./keygen";
import NFtgeneration from "./nftgen.js";
import Patentcheck from "./patentcheck";
import Webscrap from "./webscrap.js"
import Navbar from "./navbar.jsx";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="webScrap" element={<Webscrap/>} />
          <Route path="Invisiblewatermark" element={<Invisiblewatermark />} />
          <Route path="keygen" element={<Keygeneration />} />
          <Route path="nftgen" element={<NFtgeneration />} />
          <Route path="patentcheck" element={<Patentcheck/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



