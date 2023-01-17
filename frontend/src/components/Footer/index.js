import "./Footer.css"

const Footer = () => {
  return (
    <div className="main-page-footer">
      <div id="about-me">Made by Christo Grabowski</div>
      <div id="about-me-links">
        <a href="https://github.com/ChristoGrab" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/christo-grabowski-894a82a6/" target="_blank" rel="noreferrer">
          <i className="ourIco fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  )
}

export default Footer;
