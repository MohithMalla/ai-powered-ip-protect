import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css";

function Navbar() {
  const navlinkStyles = ({ isActive }) => {
    return {
      fontweight: isActive ? 'bolder' : 'normal',
    };
  };

  return (
    <div className='navbar'>
      <nav>
        <NavLink to="/" style={navlinkStyles}>Home</NavLink>
        <NavLink to="/patentcheck" style={navlinkStyles}>PatentCheck</NavLink>
        <NavLink to="/invisiblewatermark" style={navlinkStyles}>InvisibleWaterMark</NavLink>
        <NavLink to='/WebScrap' style={navlinkStyles}>Prior Analysis</NavLink>
        
        <NavLink to='/keygen' style={navlinkStyles}>Keygeneration</NavLink>
      </nav>
      </div>
  );
}

export default Navbar;
