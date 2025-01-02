import './Header.scss';

function Header() {
    return (
        <>
            <header className="header">
                <div className="header__links header__links--left">
                    <div className="header__logo">EAR</div>
                    <nav>
                        <a href="/page1">Home</a>
                        <a href="/page2">Map</a>
                        <a href="/page3">Report</a>
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