import React, { useRef } from "react";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import { CiMail } from "react-icons/ci";
import { FaPrint } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PropertyHeader.css";

const PropertyHeader = ({
  property,
  address,
  operationType,
  property_type,
  barrio,
  operations,
  idTokko,
  handlePrint,
}) => {
  const navigate = useNavigate();

  const shareOnWhatsApp = () => {
    const message = `Mira esta propiedad: ${address}. Precio: ${operations[0].prices[0].currency} ${operations[0].prices[0].price} https://www.silviafernandezpropiedades.com.ar/propiedad/${idTokko}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareByEmail = () => {
    const subject = `Interesante propiedad en ${address}`;
    const body = `Te comparto esta propiedad en ${address}. Precio: ${operations[0].prices[0].currency} ${operations[0].prices[0].price}. Mira más detalles aquí: https://www.silviafernandezpropiedades.com.ar/propiedad/${idTokko}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location = mailtoLink;
  };

  const goBack = () => navigate("/propertylist");

  return (
    <>
      <Row className="encabezado my-5 pt-5">
        <Col className="barra" md={12}>
          <div className="nombre-precio-container">
            <div className="d-flex align-items-center">
              <h1 className="address-title-details">{address}</h1>
            </div>
            <div className="price-container">
              {property.status.toLowerCase() === "reservado" && (
                <div className="price-label reserved">RESERVADO</div>
              )}
              {property.status.toLowerCase() === "vendida" && (
                <div className="price-label sold">VENDIDO</div>
              )}
            </div>

            <h2 className="price-details">
              {operationType}
              {operationType === "Alquiler temporario" || operations[0].prices[0].price === 1 ? (
                <span className="consultar-precio"> - Consultar precio</span>
              ) : (
                <>
                  {operations[0].prices[0].currency === "USD" ? " USD" : " $"}{" "}
                  {operations[0].prices[0].price.toLocaleString("es-ES")}
                </>
              )}
            </h2>
          </div>
        </Col>
        <Col className="barrio-compartir-container">
          <p className="property-type-details mt">
            {property_type} en {barrio}
          </p>
          <div className="compartir-container">
            <Button className="compartir-button" onClick={shareOnWhatsApp}>
              <FaWhatsapp className="whatsapp-icon" />
              <span>Compartir</span>
            </Button>

            <div>
              <FaPrint
                className="mx-4"
                style={{ cursor: "pointer" }}
                onClick={handlePrint} // Manejador para imprimir
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PropertyHeader;
