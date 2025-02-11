import React from "react";
import { ListGroup } from "react-bootstrap";
import { Typography } from "@mui/material";
import "./HeroCard.css";

const HeroCard = () => {
return (
    <div className="hero-card-container">
        <div className="hero-card-image">
            <img src="/images/portada.jpg" alt="Inspiration" className="hero-image" />
        </div>
        <div className="hero-card-content">
            <div className="hero-card-text">
                
                <Typography variant="h3" className="hero-card-name">Silvia Fernandez</Typography>
                <ListGroup className="hero-card-services text-center">
                    <ListGroup.Item>Alquiler</ListGroup.Item>
                    <ListGroup.Item>Venta</ListGroup.Item>
                    <ListGroup.Item>Tasaciones</ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    </div>
);
};

export default HeroCard;
