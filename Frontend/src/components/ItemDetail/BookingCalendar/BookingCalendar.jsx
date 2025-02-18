import React, { useState } from "react";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "./BookingCalendar.css"; // Estilos personalizados

const BookingCalendar = ({ occupation = [], idTokko }) => {
  const [selectedRange, setSelectedRange] = useState([null, null]);

  // Formatear fecha seleccionada (DD/MM/YYYY)
  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Extraer fechas ocupadas
  const reservedDates = occupation.map((reserva) => ({
    start: new Date(reserva.from),
    end: new Date(reserva.to),
  }));

  // Verificar si una fecha está reservada
  const isReserved = (date) => {
    return reservedDates.some(({ start, end }) => date >= start && date <= end);
  };

  // Manejar selección de rango
  const handleDateChange = (range) => {
    if (range) {
      const [start, end] = range;
      if (start && end) {
        // Verificar si el rango seleccionado incluye fechas reservadas
        const isRangeBlocked = reservedDates.some(({ start: rStart, end: rEnd }) =>
          (start >= rStart && start <= rEnd) || (end >= rStart && end <= rEnd)
        );

        if (isRangeBlocked) {
          alert("Seleccionaste fechas que ya están ocupadas. Elige otro rango.");
          setSelectedRange([null, null]);
        } else {
          setSelectedRange(range);
        }
      }
    }
  };

  // Generar link de WhatsApp con el rango seleccionado
  const handleWhatsApp = () => {
    if (!selectedRange[0] || !selectedRange[1]) {
      alert("Por favor, selecciona un rango de fechas antes de consultar.");
      return;
    }

    const phoneNumber = "5492255622841"; // Cambia esto por el número de WhatsApp de la inmobiliaria
    const message = `Hola, quisiera consultar la disponibilidad de esta propiedad https://www.silviafernandezpropiedades.com.ar/propiedad/${idTokko} para las fechas del ${formatDate(selectedRange[0])} al ${formatDate(selectedRange[1])}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="calendar-container card">
      <h3 className="calendar-title">Reservas Disponibles</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedRange}
        selectRange={true} // Activa la selección de rango
        minDate={new Date()} // No permite fechas pasadas
        tileDisabled={({ date }) => isReserved(date)} // Bloquear fechas ocupadas
        tileClassName={({ date }) => 
          isReserved(date) ? "reserved-date" : selectedRange[0] && selectedRange[1] &&
          date >= selectedRange[0] && date <= selectedRange[1] ? "selected-range" : "available-date"
        }
      />
      <Button className="btn-reservar" onClick={handleWhatsApp}>
        <FaWhatsapp className="icon-ws" />
        Consultar disponibilidad
      </Button>
    </div>
  );
};

export default BookingCalendar;
