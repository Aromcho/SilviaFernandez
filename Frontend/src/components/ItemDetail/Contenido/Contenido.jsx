import React, { useState } from 'react';
import Button from '../../Button/Button.jsx';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close as CloseIcon } from '@mui/icons-material';
import { FaHome, FaRulerCombined, FaBed, FaBath, FaCar, FaToilet, FaMoneyBillWave,FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import {  FaCompass, FaCheckCircle, FaTag } from "react-icons/fa";
import { MdOutlineBathroom, MdOutlineAspectRatio } from "react-icons/md";
import BookingCalendar from '../BookingCalendar/BookingCalendar.jsx';

import './Contenido.css';

const Contenido = ({
  operationType,
    age,
    total_surface,
    bathroom_amount,
    parking_lot_amount,
    toilet_amount,
    expenses,
    bedrooms,
    tags,
    roofed_surface,
    semiroofed_surface,
    rich_description,
    disposition,
    orientation,
    property_condition,
    planos = [],
    occupation,
    idTokko,
    room_amount,
    front_measure,
    depth_measure
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Función para abrir y cerrar el modal
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    // Funciones para navegar entre las imágenes del modal
    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? planos.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === planos.length - 1 ? 0 : prevIndex + 1));
    };

    return (
      <div className="property-container">
      <div className="property-features info-section bg-white card">
      <div className="property-info flex-row-wrap">
     
{age > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <MdOutlineCalendarToday className="info-icon" aria-label="Antigüedad" />
    <span><strong>{age === 0 ? "A estrenar" : `${age}`}</strong></span>
    <p className="text-muted">Antigüedad</p>
  </div>
)}

{roofed_surface > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaRulerCombined className="info-icon" aria-label="Superficie Cubierta" />
    <span><strong>{roofed_surface.slice(0, -3)}</strong></span>
    <p className="text-muted">Sup. Cub.</p>
  </div>
)}

{total_surface > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaRulerCombined className="info-icon" aria-label="Superficie Total" />
    <span><strong>{Math.round(total_surface)} m²</strong></span>
    <p className="text-muted">Sup. Total</p>
  </div>
)}

{front_measure > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaArrowsAltH className="info-icon" aria-label="Frente" />
    <span><strong>{front_measure} m</strong></span>
    <p className="text-muted">Frente</p>
  </div>
)}

{depth_measure > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaArrowsAltV className="info-icon" aria-label="Fondo" />
    <span><strong>{depth_measure} m</strong></span>
    <p className="text-muted">Fondo</p>
  </div>
)}

{bedrooms > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaBed className="info-icon" aria-label="Dormitorios" />
    <span><strong>{bedrooms}</strong></span>
    <p className="text-muted">{bedrooms > 1 ? "Dormitorios" : "Dormitorio"}</p>
  </div>
)}

{bathroom_amount > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaBath className="info-icon" aria-label="Baños" />
    <span><strong>{bathroom_amount}</strong></span>
    <p className="text-muted">{bathroom_amount > 1 ? "Baños" : "Baño"}</p>
  </div>
)}

{parking_lot_amount > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaCar className="info-icon" aria-label="Cochera" />
    <span><strong>{parking_lot_amount}</strong></span>
    <p className="text-muted">{parking_lot_amount > 1 ? "Cocheras" : "Cochera"}</p>
  </div>
)}

{toilet_amount > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaToilet className="info-icon" aria-label="Toilettes" />
    <span><strong>{toilet_amount}</strong></span>
    <p className="text-muted">Toilettes</p>
  </div>
)}

{expenses > 0 && (
  <div className="info-item text-center d-flex flex-column mb-5">
    <FaMoneyBillWave className="info-icon" aria-label="Expensas" />
    <span><strong>{expenses.toLocaleString("es-ES")}</strong></span>
    <p className="text-muted">Expensas</p>
  </div>
)}

      </div>
      {/* Botón para abrir el modal de planos */}
      {planos && planos.length > 0 && (
      <div className='button-planos-cont'>
        <Button 
        className="button-planos text-decoration-none" 
        text="Ver Planos"
        type='outline'
        onClick={handleModalOpen}
        />
      </div>
      )}
      {/* Modal de planos */}
      <Dialog BackdropProps={{
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.98)', // Fondo negro oscuro
      },}}
       style={{ zIndex:100000001 }} open={isModalOpen} onClose={handleModalClose} maxWidth="md">
      <DialogContent style={{ padding: 0, overflow: "hidden"  }}>
        <div className="dialog-image-container" style={{ position: 'relative', textAlign: 'center' }}>
        {/* Contador de imágenes */}
        <div style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '5px 10px',
        borderRadius: '5px'
        }}>
        {selectedImageIndex + 1}/{planos.length}
        </div>

        {/* Botón de cerrar */}
        <IconButton style={{ position: 'absolute', top: 0, right: 0, color: 'black' }} onClick={handleModalClose}>
        <CloseIcon />
        </IconButton>

        {/* Botones de navegación */}
        <IconButton style={{ position: 'absolute', top: '50%', left: 0, color: 'black' }} onClick={handlePrevImage}>
        <ArrowBackIos />
        </IconButton>
        <IconButton style={{ position: 'absolute', top: '50%', right: 0, color: 'black' }} onClick={handleNextImage}>
        <ArrowForwardIos />
        </IconButton>

        {/* Imagen actual, verificando que exista */}
        {planos[selectedImageIndex]?.image && (
        <img
        src={planos[selectedImageIndex].image}
        alt={`Plano ${selectedImageIndex + 1}`}
        style={{ width: '100%', height: 'auto', maxHeight: '90vh' }}
        />
        )}
        </div>
      </DialogContent>
      </Dialog>
      </div>

      {/* Información de detalles y descripción */}
      <div className="property-details p-0">
  {/* 🔹 INFORMACIÓN */}
  <div className="info-section card">
    <h3 className="section-title">Información</h3>
    <div className="info-details">
      {bathroom_amount > 0 && (
        <div className="info-details-item">
          <MdOutlineBathroom className="info-icon" />
          <span className="strong">Ambientes:</span> {room_amount}
        </div>
      )}
      {orientation && (
        <div className="info-details-item">
          <FaCompass className="info-icon" />
          <span className="strong">Orientación:</span> {orientation}
        </div>
      )}
      {property_condition && (
        <div className="info-details-item">
          <FaCheckCircle className="info-icon" />
          <span className="strong">Condición:</span> {property_condition}
        </div>
      )}
    </div>
  </div>

  {/* 🔹 SUPERFICIES */}
  <div className="info-section card">
    <h3 className="section-title">Superficies</h3>
    <div className="info-details">
      {roofed_surface > 0 && (
        <div className="info-details-item">
          <MdOutlineAspectRatio className="info-icon" />
          <span className="strong">Sup. Cubierta:</span> {roofed_surface.slice(0, -3)} m²
        </div>
      )}
      {semiroofed_surface > 0 && (
        <div className="info-details-item">
          <MdOutlineAspectRatio className="info-icon" />
          <span className="strong">Sup. Semicubierta:</span> {semiroofed_surface.slice(0, -3)} m²
        </div>
      )}
      {total_surface > 0 && (
        <div className="info-details-item">
          <FaRulerCombined className="info-icon" />
          <span className="strong">Sup. Total:</span> {total_surface.slice(0, -3)} m²
        </div>
      )}
    </div>
  </div>
</div>

{/* 🔹 ADICIONALES */}
{tags && tags.length > 0 && (
  <div className="property-tags card">
    <h3 className="section-title">Adicionales</h3>
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div key={index} className="tag-item">
          <FaTag className="tag-icon" />
          {tag.name}
        </div>
      ))}
    </div>
  </div>
)}
      
      <div className="property-description bg-white  rounded-3">
      {operationType === "Alquiler temporario" && (
        <div className="calendar-section ">
          <BookingCalendar occupation={occupation} idTokko={idTokko} />
        </div>
      )}
      <div className="info-section mb-5 card">
        <p className='mb-3 text-info-cont'>DESCRIPCION</p>
      <p dangerouslySetInnerHTML={{ __html: rich_description }}></p>
      </div>
        
      </div>
      </div>
    );
  };
  
export default Contenido;
