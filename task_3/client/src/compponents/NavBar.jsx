import React from 'react'
import './NavBar.css'
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
  

export default function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <div className="log">Logo</div>
                <div class="dropdown">
                    <button class="dropbtn">Login</button>
                    <div class="dropdown-content">
                    <Link to="/admin/login">admin login</Link>
                    <Link to="/student/login">student login</Link>
                       
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Register</button>
                    <div class="dropdown-content">
                    <Link to="/admin/register">admin register</Link>
                    <Link to="/student/register">student register</Link>
                    </div>
                </div>


               

            </nav>

        </div>
    )
}
