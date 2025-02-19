import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { FaHeart, FaBed, FaBath, FaCar, FaRulerCombined,FaArrowsAltV, FaArrowsAltH  } from "react-icons/fa";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./Item.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrows for the carousel
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIos
      className={className}
      style={{
        ...style,
        width: 50,
        height: 50,
        display: "block",
        color: "white",
        right: 10,
        zIndex: 1,
        background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)",
        borderRadius: "50%",
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.4)",
        padding: 13,
        transition: "all 0.3s ease",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIos
      className={className}
      style={{
        ...style,
        width: 50,
        height: 50,
        display: "block",
        color: "white",
        left: 10,
        zIndex: 1,
        background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)",
        borderRadius: "50%",
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.4)",
        padding: 13,
        transition: "all 0.3s ease",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const Item = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const mainImages = property.photos?.slice(0, 5) || [{ image: "default-image.jpg" }];

  // Obtener todas las operaciones disponibles y formatear nombres
  const operations = property.operations.map(op => 
    op.operation_type === "Alquiler temporario" ? "Alquiler temporario" : op.operation_type
  );

  const operationType = operations.length > 0 ? operations.join(" - ") : "Operación no disponible";

  // Determinar el precio
  const hasTemporaryRent = property.operations.some(op => op.operation_type === "Alquiler temporario");
  const price = hasTemporaryRent
    ? "CONSULTAR PRECIO"
    : property.operations[0]?.prices[0]?.price
      ? `${property.operations[0].prices[0].currency === "USD" ? "USD" : "$"} ${property.operations[0].prices[0].price.toLocaleString("es-ES")}`
      : "Precio no disponible";

  const bedrooms = property.suite_amount || 0;
  const bathrooms = property.bathroom_amount || 0;
  const parkingLots = property.parking_lot_amount || 0;
  const size = property.total_surface || 0;
  const address = property.address || "Dirección no disponible";
  const barrio = property.location.name || "Barrio no disponible";
  const propertyId = property.id;
  const total_surface = property.surface || 0;
  const front_measure = property.front_measure || 0;
  const depth_measure = property.depth_measure || 0;
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
  };

  return (
    <Card className="card-item shadow-lg overflow-hidden text-black">
      <Link to={`/propiedad/${propertyId}`} state={{ property }} className="link-full">
        <div className="head-prop">
          <span className="type-item">{operationType.toUpperCase()}</span>
          <span className="price-item">{price}</span>
        </div>

        <Slider {...settings} className="image-wrapper">
          {mainImages.map((img, index) => (
            <div key={index}>
              <img className="img-rounded" src={img.image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>

        <Card.Body className="py-4">
          <div className="card-header-item">
            <div className="direction-container">
              <h5 className="barrio-item">{barrio}</h5>
              <p className="direccion-item">{address}</p>
            </div>
          </div>
          <div className="property-info d-flex justify-content-around">
            {size > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{size.toString().slice(0, -3)}</span>
                <FaRulerCombined size={16} className="card-icons-item" />
              </div>
            )}
            {bedrooms > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{bedrooms}</span>
                <FaBed size={16} className="card-icons-item" />
              </div>
            )}
            {bathrooms > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{bathrooms}</span>
                <FaBath size={16} className="card-icons-item" />
              </div>
            )}
            {parkingLots > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{parkingLots}</span>
                <FaCar size={16} className="card-icons-item" />
              </div>
            )}
            {total_surface > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{Math.round(total_surface)} m²</span>
                <FaRulerCombined className="info-icon" aria-label="Superficie Total" />
              </div>
            )}
            
            {front_measure > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{front_measure} m</span>
                <FaArrowsAltH className="info-icon" aria-label="Frente" />
              </div>
            )}
            
            {depth_measure > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{depth_measure} m</span>
                <FaArrowsAltV className="info-icon" aria-label="Fondo" />
              </div>
            )}
          </div>

        </Card.Body>
      </Link>
    </Card>
  );
};

export default Item;
