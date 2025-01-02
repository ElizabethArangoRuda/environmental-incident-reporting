import './Footer.scss';
import twitter from '../../assets/icons/twitter.svg';
import instagram from '../../assets/icons/instagram.svg';
import linkedin from '../../assets/icons/linkedin.svg';

function Footer() {
    return (
        <footer className="footer">
            <section className="footer__all">
                <section className="footer__section">
                    <section className="footer__columns">
                        <article className="footer__column">
                            <p>For Environmental Professionals</p>
                            <p>Incident Reporting</p>
                            <p>Resources</p>
                        </article>
                        
                        <article className="footer__column">
                            <p>About</p>
                            <p>Careers</p>
                            <p>Support</p>
                        </article>

                        <article className="footer__column">
                            <p>Contact</p>
                            <p>Blog</p>
                            <p>FAQ</p>
                        </article>
                    </section>
                </section>

                <section className="footer__logos">
                    <a href="https://www.linkedin.com/in/elizabeth-arango-ruda/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} className="footer__logos--icon" alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com/earangor/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} className="footer__logos--icon" alt="Instagram" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twitter} className="footer__logos--icon" alt="Twitter" />
                    </a>
                </section>
            </section>

            <section className="footer__copyright">
                <p>© 2024 Environmental Incident Reporting. All rights reserved.</p>
                <div className="footer__links">
                    <p>Terms</p>
                    <p>Privacy</p>
                    <p>Cookies</p>
                </div>
            </section>
        </footer>
    );
}

export default Footer;