import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import MapaInteractivo from "../MapaInteractivo/MapaInteractivo";
import Title from "../Title/Title";
import RelatedListContainer from "../RelatedListContainer/RelatedListContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ItemDetail.css";
import Print from "../Print/Print";
import ContacForm from "../Forms/ContactForm/ContactForm";
import { Skeleton, Dialog, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Contenido from "./Contenido/Contenido";
import PropertyHeader from "./PropertyHeader/PropertyHeader";
import PropertyGallery from "./PropertyGallery/PropertyGallery";

const ItemDetail = ({ property, planos }) => {
  const printRef = useRef();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar Lightbox
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
console.log(property)
  const { photos,  rich_description } = property;
  const totalImages = photos.length;

  const videos = Array.isArray(property.videos) ? property.videos : [];
  const idTokko = property.id;
  const total_surface = property.surface;
  const roofed_surface = property.roofed_surface;
  const semiroofed_surface = property?.semiroofed_surface || 0;
  const room_amount = property.room_amount;
  const address = property.address;
  const bathroom_amount = property.bathroom_amount;
  const bedrooms = property.suite_amount;
  const parking_lot_amount = property.parking_lot_amount;
  const age = property.age;
  const toilet_amount = property.toilet_amount;
  const barrio = property.location ? property.location.name : "";
  const tags = property.tags;
  const property_type = property.type ? property.type.name : "";
  const operations = property.operations && property.operations[0] ? property.operations : [];
  const expenses = property?.expenses || 0;
  const disposition = property?.disposition;
  const orientation = property?.orientation;
  const property_condition = property?.property_condition;
  const operationType = property.operations[0]?.operation_type;
  const occupation = property?.occupation || [];
  const depth_measure = property?.depth_measure || 0;
  const front_measure = property?.front_measure || 0;

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen) {
        if (event.key === "ArrowLeft") {
          handlePrevImage();
        } else if (event.key === "ArrowRight") {
          handleNextImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
console.log(property)
  return (
    <Container className="my-5 text-dark property-detail">
      {/* Botón de regreso */}
     

      {/* Encabezado */}
      <PropertyHeader
        property={property}
        address={address}
        operationType={operationType}
        property_type={property_type}
        barrio={barrio}
        operations={operations}
        handlePrint={handlePrint}
        idTokko={idTokko}
      />
      {/* Carrusel de imágenes */}
      
      <PropertyGallery photos={photos} videos={videos} />
      {/* Detalles de la propiedad */}
      <Contenido
      idTokko={idTokko}
        age={age}
        total_surface={total_surface}
        room_amount={room_amount}
        address={address}
        bathroom_amount={bathroom_amount}
        bedrooms={bedrooms}
        parking_lot_amount={parking_lot_amount}
        toilet_amount={toilet_amount}
        expenses={expenses}
        tags={tags}
        roofed_surface={roofed_surface}
        semiroofed_surface={semiroofed_surface}
        rich_description={rich_description}
        disposition={disposition}
        orientation={orientation}
        property_condition={property_condition}
        property={property}
        planos={planos}
        operationType={operationType}
        occupation={occupation}
        depth_measure={depth_measure}
        front_measure={front_measure}
      />
      
      

      {/* Nuestra Selección */}
      <Row>
        <div className="container seleccion--container mt-5 pt-5">
          <Title
            title="PROPIEDADES SIMILARES"
            linkButton="/highlighted"
            buttonStyle="outline red"
          />
          <div className="prop-list">
            <RelatedListContainer
              id={idTokko}
              price={operations[0].prices[0].price}
              location={barrio}
              propertyType={property_type}
            />
          </div>
        </div>
      </Row>

      {/* Componente Print */}
      <div ref={printRef} className="d-none">
        <Print property={property} />
      </div>
      <div className="form-detail-container">
        <ContacForm />
      </div>
    </Container>
  );
};

export default ItemDetail;
