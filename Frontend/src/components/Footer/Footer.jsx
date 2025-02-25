import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classes, getWindowDimensions } from "../../helpers/index.js";
import { PATHS, SOCIAL } from "../../../config/index.js";
import { TitleWithIcon } from "../TitleWithIcon/TitleWithIcon.jsx";
import {
  FacebookCircleIcon,
  InstaCircleIcon,
  LinkedinCircleIcon,
  LocationIcon,
  MailIcon,
  MessengerCircleIcon,
  TelIcon,
  WhatsappIcon,
  YoutubeCircleIcon,
} from "../Icons/Icons.jsx";
import './Footer.css';

export const Footer = ({ small = true, id, backToTopFooter }) => {
  const legalInfo = {
    text: "*Para los casos de alquiler de vivienda, el monto máximo de comisión que se le puede requerir a los propietarios será el equivalente al cuatro con quince centésimos por ciento (4,15%) del valor total del respectivo contrato. Se encuentra prohibido cobrar comisiones inmobiliarias y gastos de gestoría de informes a los inquilinos que sean personas físicas.",
    linkText: "Términos y Condiciones",
    link: `${PATHS.TERMINOS}`,
    mp: "CUCICBA Mat. 5111 CMCPSI Mat. 6528",
  };

  const socialInfo = [
    { link: "https://www.instagram.com/silviafernandezpropiedades/", icon: <InstaCircleIcon /> },
    { link: `https://www.facebook.com/Silviafernadezpropiedades/`, icon: <FacebookCircleIcon /> },
    { link: ``, icon: <YoutubeCircleIcon /> },
    { link: ``, icon: <LinkedinCircleIcon /> },
    { link: ``, icon: <MessengerCircleIcon /> },
  ];

 



  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [BackContainerHeight, setBackContainerHeight] = useState();
  const footerWrapper = useRef(null);

  useEffect(() => {
    setBackContainerHeight(footerWrapper?.current?.offsetHeight);
  }, [windowDimensions]);

  return (
    <footer className="footer-container" id={id}>
      <div className="footer-wrapper">
        {/* Sección de redes sociales */}
        <div className="footer-left">
          <div className="social-list">
            {socialInfo.map((i, k) => (
              <Link to={`${i?.link.toString()}`} key={k} target="_blank">
                <span className="social--link text-white">{i.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sección del logotipo */}
        <div className="footer-center">
          <img
            className="brand-footer"
            src="/images/icon-logo-sf.png"
            alt="Silvia Fernandez Inmobiliaria"
            title="Silvia Fernandez Inmobiliaria"
            loading="lazy"
          />
        </div>

        {/* Sección de términos y condiciones */}
        <div className="footer-right ">
          <div className="legal-text">{legalInfo.text}</div>
          <div className="legal-link">
            
          </div>
          <div className="mp"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;