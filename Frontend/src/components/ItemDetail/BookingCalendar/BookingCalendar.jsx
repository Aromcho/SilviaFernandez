import React, { useState } from "react";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "./BookingCalendar.css"; // Estilos personalizados

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Formatear fecha seleccionada (DD/MM/YYYY)
  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Generar link de WhatsApp con la fecha seleccionada
  const handleWhatsApp = () => {
    const phoneNumber = "5492255622841"; // Cambia esto por el número de WhatsApp de la inmobiliaria
    const message = `Hola, quisiera consultar la disponibilidad para la fecha ${formatDate(selectedDate)}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="calendar-container">
      <h3 className="calendar-title">Reservas</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={new Date()} // No permite fechas pasadas
      />
      <Button className="btn-reservar" onClick={handleWhatsApp}>
        <FaWhatsapp className="icon-ws" />
        Consultar disponibilidad
      </Button>
    </div>
  );
};

export default BookingCalendar;
