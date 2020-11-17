import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <nav className="header">
            <div className="title">
                <Link to="/" className="home-link">LOGO</Link>
            </div>
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/contact" className="link">Contact</Link>
                </li>                                
            </ul>
        </nav>
    )
}
