import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Corregir el import de Link
import { FiltersContext } from '../../context/FiltersContext';
import 'leaflet/dist/leaflet.css';
import "./Home.css";
import SearchHomeForm from "../../components/SearchHomeForm/SearchHomeForm.jsx";
import FeatureListContainer from "../../components/FeatureListContainer/FeatureListContainer.jsx";
import HomeMap from "../../components/HomeMap/HomeMap.jsx";
import SuggestionCards from "../../components/SuggestionCards/SuggestionCards.jsx";
import ChatBubble from "../../components/ChatBubble/ChatBubble.jsx";
import ChatModal from "../../components/ChatModal/ChatModal.jsx";
import { FaWhatsapp } from "react-icons/fa";
import HeroCard from "../../components/HeroCard/HeroCard.jsx";
import ContactForm from "../../components/Forms/ContactForm/ContactForm.jsx";
import PozoConstruccion from "../../components/PozoConstruccion/PozoConstruccion.jsx";
const Home = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useContext(FiltersContext);
  const [isMobile, setIsMobile] = useState(false); // Nuevo estado para detectar si es mobile
  const location = useLocation();
  const [showChatModal, setShowChatModal] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
    // Función para verificar el tamaño de la pantalla
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 992); // Definir si es mobile con ancho <= 992px
    };

    checkIsMobile(); // Verificar en el primer renderizado

    // Agregar un listener para cambios de tamaño de pantalla
    window.addEventListener("resize", checkIsMobile);

    return () => {
      // Limpiar el listener al desmontar el componente
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('fromHome', 'true');
    navigate("/propertylist", { state: { filters } }); // Redirigir a la lista de propiedades
  };

  useEffect(() => {
    if (location.state?.scrollTo === "contact-section") {
      const element = document.getElementById("contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  
  return (
    <div className="layout transparent">
      <div className="hero-wrapper">
        {!isMobile ? (
          <video autoPlay muted loop className="video" src="/home-video.mp4">
          </video>
        ) : (
          <img
            src="/Foto_Portada.jpg"
            alt="Portada"
            className="w-100 h-100 position-absolute top-0 start-0"
          />
        )}

        {/* Imagen de superposición que siempre cubre el video o la imagen */}
        
        <div className="overlay"></div>
        <div className="container-form-serch align--center">
          <h1 className="titulo-hero">Conseguí tu lugar ideal</h1>
          <SearchHomeForm formData={filters} setFormData={updateFilters} handleSubmit={handleSubmit} />
        </div>
      </div>
      
      <div className="seleccion-section">
      <SuggestionCards/>
      </div>
      {
      /*"<div className="pozo-section">
        <PozoConstruccion />
      </div>"*/
      }
      <div className="primary-section">
        <HeroCard />
      </div>
      <div className="suggested-properties-section">
  <FeatureListContainer />
</div>

      <div id="contact-section" className="contact-section">
        <ContactForm />
      <HomeMap/>
        
      </div>
      <div className="floating-icons">
        <a href="https://wa.me/542255626092" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <FaWhatsapp />
        </a>
      </div>
      {/* Burbuja de Chat */}
      <ChatBubble onClick={() => setShowChatModal(true)} />

      {/* Modal de Chat */}
      <ChatModal show={showChatModal} onHide={() => setShowChatModal(false)} />
    
    </div>
  );
};

export default Home;
