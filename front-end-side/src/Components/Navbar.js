import React from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {

    return (
        <div className="navigation-block">
            <div className='container'>
                <div className='navbar'>
                    <div id="logotype">Expenses tracker</div>
                    <div id="links">
                        <Link to="/">Home</Link>
                        <Link to="/friends">Friends</Link>
                        <Link to="/data">Data</Link>
                    </div>
                </div>
            </div>
            <hr className="nav-seperator"/>
        </div>
        );

}
export default Navbar;