import React from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {

    return (
        <div class="navigation-block">
            <div className='container'>
                <div className='navbar'>
                    <div id="logotype">Expenses tracker</div>
                    <div id="links">
                        <Link to="/">Home</Link>
                        <Link to="/friends">Friends</Link>
                        <Link to="/data">Data</Link>
                        <Link to="/enter-data">Enter data</Link>
                        <Link to="/file-upload" class="right-link">File upload</Link>
                    </div>
                </div>
            </div>
            <hr class="nav-seperator"/>
        </div>
        );

}
export default Navbar;