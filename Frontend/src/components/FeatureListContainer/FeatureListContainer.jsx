import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Item from '../Item/Item.jsx';
import './FeatureListContainer.css';

const FeatureListContainer = () => {
  const [data, setData] = useState({}); // Datos de las propiedades
  const [loading, setLoading] = useState({}); // Estado de carga
  const cache = useRef({}); // Cache local en memoria

  const propertyTypes = [
    { type: 'Casa', title: 'Casas' },
    { type: 'Departamento', title: 'Departamentos' },
    { type: 'Terreno', title: 'Terrenos' },
    { type: 'Local', title: 'Locales' },
  ];

  useEffect(() => {
    const fetchData = async (type) => {
      if (cache.current[type]) {
        // Si ya tenemos datos en cache, los usamos
        setData((prev) => ({ ...prev, [type]: cache.current[type] }));
        setLoading((prev) => ({ ...prev, [type]: false }));
        return;
      }

      setLoading((prev) => ({ ...prev, [type]: true }));
      try {
        const response = await axios.get('/api/property/properties', {
          params: { limit: 5, property_type: type, order: 'desc' },
        });

        // Guardamos los datos en el cache
        cache.current[type] = response.data.objects;
        setData((prev) => ({ ...prev, [type]: response.data.objects }));
      } catch (error) {
        console.error(`Error al obtener propiedades para ${type}:`, error);
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
    };

    propertyTypes.forEach(({ type }) => fetchData(type));
  }, []);

  const settings = {
    dots: true,
    initialSlide: -0.1, // Posicionamiento inicial
    infinite: true,
    speed: 500,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1.1,
        },
      },
    ],
  };

  return (
    <div className="feature-list-container">
      {propertyTypes.map(({ type, title }, index) => (
        <div
          key={type}
          className={`feature-section ${
            index % 2 === 0 ? 'primary-bg' : 'white-bg'
          }`}
        >
          <h2 className="section-title">{title}</h2>
          {loading[type] ? (
            <p>Cargando {title.toLowerCase()}...</p>
          ) : data[type]?.length > 0 ? (
            <Slider {...settings}>
              {data[type].map((property) => (
                <div key={property._id} className="carousel-card">
                  <Item  property={property} />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="empty-text">No se encontraron {title.toLowerCase()}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeatureListContainer;
