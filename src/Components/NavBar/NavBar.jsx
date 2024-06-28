import React from "react";
import { Link } from "react-router-dom";

const NavBar=()=>{
    return(
        <>
        {/* <h1>Nav Bar</h1> */}
        <nav className="navbar  navbar-dark navbar-expand-sm bg-dark">
            <div className="container">
                <Link to='/' className='navbar-brand'><i className="fa fa-mobile text-warning me-2"></i>Contact <span className="text-warning">Manager</span></Link>
            </div>
        </nav>
        </>
    )
}
export default NavBar