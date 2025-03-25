import { useState ,Button} from "react";
import Navbar from "./navbar";
import "./home.css";
import homeImg from "./homeimg.png";
import { NavLink } from "react-router-dom";
 function Home() {
  const navlinkStyles = ({ isActive }) => {
    return {
      fontweight: isActive ? 'bolder' : 'normal',
    };
  }

  return (
    <div className="home-container">
      <div className="subhead">
      <div>
        <h1 className="head">One Stop Solution for IP Protection</h1>
        <h5>-" Secure Ideas, Protect Innovation – Your One-Stop IP Solution "</h5>
        <p>A comprehensive platform that safeguards innovations through <br></br>web scraping, invisible watermarking, patent verification, and <br></br>NFT-based security. </p>
                <NavLink to="/patentcheck" style={navlinkStyles} className="btn">PatentCheck</NavLink>
                <NavLink to="/invisiblewatermark" style={navlinkStyles} className="btn">Invisible WaterMark</NavLink>
                <NavLink to='/WebScrap' style={navlinkStyles} className="btn">Prior Analysis</NavLink>
                <NavLink to='/keygen' style={navlinkStyles} className="btn">Key generation</NavLink>
        </div>
        <img src={homeImg} alt="Home" />
        </div>    </div>
  );
}
export default Home;
