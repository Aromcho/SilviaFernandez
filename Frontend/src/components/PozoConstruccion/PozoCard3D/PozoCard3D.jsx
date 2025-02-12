import React from 'react';
import "./PozoCard3D.css";
import { Typography } from "@mui/material";

import { FaHouseChimneyUser } from "react-icons/fa6";


const PozoCard3D = () => {
  return (
      <div className="parent">
        <div className="pozo-card">
          <div className="logo">
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
            <span className="circle circle5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" className="svg">
              <FaHouseChimneyUser />
              </svg>
            </span>
          </div>

          <div className="glass" />

          {/* Contenido */}
          <div className="content">
            <Typography variant="h3" className="title">Invertí en tu Futuro</Typography>
            <span className="description">
              Participa en exclusivos proyectos en pozo con alto retorno de inversión.
              Financiación flexible y ubicaciones estratégicas.
            </span>
          </div>

          {/* Sección Inferior */}
          <div className="bottom">
            {/* Botones Sociales */}
            <div className="social-buttons-container">
              <button className="social-button social-button1">
                <Typography variant="h5" className="">Ver detalles</Typography>
              </button>
            </div>

            {/* Botón Ver Más */}
            <div className="view-more">
              <button className="view-more-button">Ver más</button>
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PozoCard3D;
