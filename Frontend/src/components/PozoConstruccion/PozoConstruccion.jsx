import React from "react";
import { ListGroup } from "react-bootstrap";
import { Typography } from "@mui/material";
import PozoCard3D from "./PozoCard3D/PozoCard3D.jsx";
import PozoCarousel3D from "./PozoCarousel3D/PozoCarousel3D.jsx";
import "./PozoConstruccion.css";

const PozoConstruccion = () => {

  return (
    <div className="pozo-card-container">
                

         <div className="pozo-card-content">
         <PozoCard3D />
      </div>
      
      <div className="pozo-card-image">
      <PozoCarousel3D />      </div>
     
    </div>
  );
};

export default PozoConstruccion;