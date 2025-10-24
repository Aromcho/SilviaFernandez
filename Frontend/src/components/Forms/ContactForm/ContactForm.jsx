import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Typography } from "@mui/material";
import "./ContactForm.css";

const ContactForm = () => {
    const sectionRef = useRef(null);
    
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        url: "",
        subject: "Quiero vender",
    });

    const [error, setError] = useState({
        name: false,
        email: false,
        phone: false,
    });

    const [status, setStatus] = useState({
        status: "",
        text: "",
    });

    useEffect(() => {
        setData((prevData) => ({ ...prevData, url: window.location.href }));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const sendContact = async (contactData) => {
        try {
            const response = await axios.post("/api/contact", contactData);
            return response.data;
        } catch (error) {
            console.error("Error al enviar contacto:", error);
            throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({
            name: data.name === "",
            email: data.email === "",
            phone: data.phone === "",
        });

        if (data.name === "" || data.email === "" || data.phone === "") {
            setStatus({ status: "error", text: "Revise los campos requeridos" });
            return;
        }

        sendContact(data)
            .then(() => {
                setStatus({ status: "success", text: "Tu contacto ha sido enviado" });
                setData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    url: window.location.href,
                    subject: "Quiero vender",
                });
            })
            .catch(() => {
                setStatus({ status: "error", text: "Ha ocurrido un error, reintente en unos minutos" });
            });
    };

    return (
        <section ref={sectionRef} className="section-contact">
            {/* 🌟 Información de Contacto */}
            <div className="contact-header">
                <Typography variant="h3" className="contact-title">Contáctanos</Typography>
                <Typography variant="body1" className="contact-subtitle">
                    Estamos aquí para ayudarte. ¡Envíanos un mensaje y nos pondremos en contacto contigo lo antes posible!
                </Typography>
            </div>

            <div className="contact-content">
                {/* 🌟 Formulario */}
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre Completo *"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className={error.name ? "input-error" : ""}
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico *"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className={error.email ? "input-error" : ""}
                        />
                        <input
                            type="tel"
                            placeholder="Teléfono *"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                            className={error.phone ? "input-error" : ""}
                        />
                        <textarea
                            placeholder="Escribe tu mensaje aquí..."
                            rows="3"
                            value={data.message}
                            onChange={(e) => setData({ ...data, message: e.target.value })}
                        />
                        {status.status && <Typography variant="body2" className={`feedback-msg ${status.status}`}>{status.text}</Typography>}
                        <button type="submit" className="cta-button">Enviar Mensaje</button>
                    </form>
                </div>

                {/* 🌟 Línea Divisoria */}
                <div className="divider"></div>

                {/* 🌟 Información de Contacto y Botones */}
                <div className="contact-info">
                    <button className="info-button">
                        <FaEnvelope size={20} /> Correo: <span>braicesfernandez@gmail.com</span>
                    </button>
                    <button className="info-button">
                        <FaPhone size={20} /> Alquileres: <span>+54 9 2255 62-2841</span>
                    </button>
                    <button className="info-button">
                        <FaPhone size={20} /> Ventas: <span>+54 9 2255 62-6092</span>
                    </button>
                    <button className="info-button">
                        <FaMapMarkerAlt size={20} /> Central: <span>Calle 34 y Mar del Plata - Mar Azul</span>
                    </button>
                    <button className="info-button">
                        <FaMapMarkerAlt size={20} /> Sucursal: <span>Av del Plata y Uritorco - Mar de las Pampas</span>
                    </button>

                    {/* 🌟 Redes Sociales */}
                    <div className="social-buttons">
                        <a href="https://www.facebook.com/Silviafernadezpropiedades/" target="_blank" className="social-button"><FaFacebook size={20} /></a>
                        <a href="https://www.instagram.com/silviafernandezpropiedades/#" target="_blank" className="social-button"><FaInstagram size={20} /></a>
                        <a href="#" className="social-button"><FaLinkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
