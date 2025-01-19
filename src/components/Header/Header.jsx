import './Header.scss';
import { Link } from "react-router-dom";


function Header() {
    return (
        <header className="header">
            <div className="header__links header__links--left">
                <div className="header__logo">EAR</div>
                <nav>
                    <Link to={`/`} aria-label="Home">Home</Link>
                    <Link to={`/map`} className="nav__add-link" aria-label="Map">Map</Link>
                    <Link to={`/report`} aria-label="Add an Issue">Add an Issue</Link>
                </nav>
            </div>
            <div className="header__links header__links--right">
                <button className="header__button" aria-label="Search">Search</button>
                <button className="header__button" aria-label="Switch Language">Switch Language</button>
                <button className="header__button" aria-label="Sign In">Sign In</button>
            </div>
        </header>
    );
}

export default Header;