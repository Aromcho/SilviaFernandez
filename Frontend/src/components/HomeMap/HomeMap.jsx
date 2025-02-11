import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Container } from "react-bootstrap";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./HomeMap.css";

// 📌 Icono de pin verde
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const HomeMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("/api/locations")
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error("Error cargando las ubicaciones:", error);
      });
  }, []);

  // 🔥 CENTRO EN MAR AZUL 🔥
  const mapCenter = [-37.3195, -57.0228]; // Mar Azul, Buenos Aires
  const zoomLevel = 14;

  return (
    <div className="map-section">
      <Container className="home-map-container">
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "100vh" }} className="leaflet-map">
          {/* 🌍 MISMA CAPA CARTO */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
          />

          {/* 📌 Pines con hover y click */}
          {locations.map((location) => (
            <Marker 
              key={location.id} 
              position={[location.loc.lat, location.loc.lon]} 
              icon={greenIcon}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                click: (e) => e.target.openPopup(),  // 🔥 Permite abrir con click
                mouseout: (e) => {
                  if (!e.target.isPopupOpen()) {  // 🔥 Si no hicieron click, se cierra al salir
                    e.target.closePopup();
                  }
                },
              }}
            >
              <Popup className="custom-tooltip">
                <h4>{location.name}</h4>
                <p>{location.address}</p>
                <a 
                  href={`/propiedad/${location.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="map-link"
                >
                  🔗 Ver propiedad
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Container>
    </div>
  );
};

export default HomeMap;
  