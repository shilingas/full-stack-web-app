import React from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {

    return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/enter-data">Enter data</Link>
            <Link to="/show-data">Show data</Link>
        </div>
        );

}
export default Navbar;