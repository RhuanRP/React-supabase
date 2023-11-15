import "./styles.css";
import logo from "../../assets/logo.png";

function Header() {

  return (
    <header>
      <div className="header-styles">
        <img className="logo-header" src={logo} alt="Logo" />
        <span className="title-header">Uploader</span>
      </div>
    </header>
  );
}

export default Header;