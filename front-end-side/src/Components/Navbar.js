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
                        <Link to="/enter-data">Enter data</Link>
                        <Link to="/read-from-file-data">Data from file</Link>
                        <Link to="/show-data" class="right-link">Show data</Link>
                    </div>
                </div>
            </div>
            <hr class="nav-seperator"/>
        </div>
        );

}
export default Navbar;