import './Header.scss';
import { Link } from "react-router-dom";


function Header() {
    return (
        <>
            <header className="header">
                <div className="header__links header__links--left">
                    <div className="header__logo">EAR</div>
                    <nav>
                        <Link to={`/`}>Home</Link>
                        <Link  to={`/map`} className="nav__add-link">Map</Link>
                        <Link to={`/report`}>Add an Issue</Link>
                    </nav>
                </div>
                <div className="header__links header__links--right">
                    <button className="header__button">Search</button>
                    <button className="header__button">Switch Language</button>
                    <button className="header__button">Sign In</button>
                </div>
            </header>
        </>
    );
}

export default Header;