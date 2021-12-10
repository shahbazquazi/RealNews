import React, { Component } from 'react'
import {NavLink} from "react-router-dom";
import '../App.css';

export class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/general"><img src="/logo.png" alt="RealNews" /></NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/general" activeclassname="active">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link"  to="/business" activeclassname="active">Business</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/entertainment" activeclassname="active">Entertainment</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/general" activeclassname="active">General</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/health" activeclassname="active">Health</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/science" activeclassname="active">Science</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/sports" activeclassname="active">Sports</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link"  to="/technology" activeclassname="active">Technology</NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
