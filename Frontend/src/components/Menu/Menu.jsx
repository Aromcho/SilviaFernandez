import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../../config/index.js";
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import './Menu.css';

/* Icons */
import {
  TelIcon,
  HeartIcon,
  BelgaIsoIcon,
  SearchIcon,
  EmprendimientosIcon,  
  WhatsappIcon,
} from "../Icons/Icons.jsx";

export const Menu = () => {
  const [sticky, setSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hideMenuInfo, setHideMenuInfo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollTop) {
        setHideMenuInfo(true);
      } else {
        setHideMenuInfo(false);
      }

      setSticky(scrollTop > 0);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
  const handleCloseMenu = () => {
    setShowMenu(false);
  };
  

  const isHome = location.pathname === "/";

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: sticky || !isHome ? "white" : "var(--primary-color)",
      }}fixed="top"
      className={`menu-container ${sticky  ? "sticky" : ""}`}
    >
      
      <div className="nav-flex-container">
        <Navbar.Brand className={`menu-brand-wrapper w-100 ${sticky  ? "sticky" : ""}`} as={Link} to="/">
          {!sticky  ? (
            <img
              className="logo-img"
              src="/images/logo-sf.png"
              alt="Silvia Fernandez"
            />
          ) : (
            <img
              className="logo-scrolled"
              src="/images/icon-logo-sf.png"
              alt="Silvia Fernandez"
            />
          )}
        </Navbar.Brand>

        <Nav className="menu-nav">
        <Nav.Link
  as={Link}
  to="propertylist"
  className={`menu--link ${sticky || !isHome ? "black-line sticky-link" : ""}`}
>
  Propiedades
</Nav.Link>
<Nav.Link
  as={Link}
  to="terrenos"
  className={`menu--link ${sticky || !isHome ? "black-line sticky-link" : ""}`}
>
  Lotes - Terrenos
</Nav.Link>
<Nav.Link
  as={Link}
  to="complejos"
  className={`menu--link ${sticky || !isHome ? "black-line sticky-link" : ""}`}
>
  Complejos
</Nav.Link>
<Nav.Link
  as={Link}
  to="nosotros"
  className={`menu--link ${sticky || !isHome ? "black-line sticky-link" : ""}`}
>
  Nosotros
</Nav.Link>
<Nav.Link
  as={Link}
  to="mapa"
  className={`menu--link ${sticky || !isHome ? "black-line sticky-link" : ""}`}
>
  Mapa
</Nav.Link>
<Nav.Link
  as={Link}
  to="Noticia"
  className={`menu--link ${sticky || !isHome ? "black-line sticky-link" : ""}`}
>
  Noticias
</Nav.Link>
          
        </Nav>
        <div
          className={`burger-button ${showMenu ? "active" : ""}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="icon-wrapper">
            <div
              className={`burger-cross-custom ${showMenu ? "cross " : " burger"
                } ${(!isHome || sticky) && !showMenu ? "burger-dark" : ""}`}  // Cambia el color según la condición
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </div>
          </div>
        </div>
      </div>

      <div className={`burger-menu ${showMenu ? "active" : ""}`}>
  <ul className="px-5 py-3 burger-menu-list">
    <li className="burger-menu-item">
      <Link to="/propertylist" className="burger--menu-link" onClick={handleCloseMenu}>
        <span className="link-text">Propiedades</span>
      </Link>
    </li>
    <li className="burger-menu-item">
      <Link to="terrenos" className="burger--menu-link" onClick={handleCloseMenu}>
        <span className="link-text">Lotes - Terrenos</span>
      </Link>
    </li>
    <li className="burger-menu-item">
      <Link to="complejos" className="burger--menu-link" onClick={handleCloseMenu}>
        <span className="link-text">Complejos</span>
      </Link>
    </li>
    <li className="burger-menu-item">
      <Link to="/nosotros" className="burger--menu-link" onClick={handleCloseMenu}>
        <span className="link-text">Nosotros</span>
      </Link>
    </li>
    <li className="burger-menu-item">
      <Link to="/mapa" className="burger--menu-link" onClick={handleCloseMenu}>
        <span className="link-text">Mapa</span>
      </Link>
    </li>
  </ul>
</div>

    </Navbar>
  );
};

export default Menu;
