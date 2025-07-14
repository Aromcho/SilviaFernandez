import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { Container } from "react-bootstrap";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./HomeMap.css"; // Asegurate de que esto esté bien

// Crear un icono HTML desde el ícono de React
const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt size={30} color="green" />);
const customIcon = L.divIcon({
  html: iconMarkup,
  className: "custom-div-icon", // para poder darle estilo si querés
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});

const HomeMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    axios.get("/api/locations")
      .then((response) => {
        setLocations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando ubicaciones:", error);
        setLoading(false);
      });
  }, []);

  const mapCenter = [-37.3195, -57.0228];
  const zoomLevel = 14;

  return (
    <div className="map-section">
      <div className="map-header">
        <h2>Mapa de nuestras propiedades en Mar Azul</h2>
      </div>

      {loading ? (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Cargando propiedades...</p>
        </div>
      ) : (
        <Container fluid className="map-container-wrapper">
          <div className="map-sidebar">
            <h3>Propiedades Destacadas</h3>
            <div className="location-list">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`location-item ${activeLocation === location.id ? "active" : ""}`}
                  onClick={() => setActiveLocation(location.id)}
                >
                  <img src={location.photo} alt={location.address} />
                  <h4>{location.name}</h4>
                  <p>{location.address}</p>
                  <a href={`/propiedad/${location.id}`} className="location-link">
                    Ver detalles
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="map-container">
            <MapContainer
              center={mapCenter}
              zoom={zoomLevel}
              zoomControl={false}
              className="leaflet-map"
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
              />

              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.loc.lat, location.loc.lon]}
                  icon={customIcon}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                      setActiveLocation(location.id);
                    },
                    click: (e) => {
                      e.target.openPopup();
                      setActiveLocation(location.id);
                    },
                    mouseout: (e) => {
                      if (!e.target.isPopupOpen()) {
                        e.target.closePopup();
                        setActiveLocation(null);
                      }
                    },
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <h4>{location.name}</h4>
                      <p className="popup-address">{location.address}</p>
                      <div className="popup-footer">
                        <a
                          href={`/propiedad/${location.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="popup-button"
                        >
                          Ver propiedad
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Container>
      )}
    </div>
  );
};

export default HomeMap;
