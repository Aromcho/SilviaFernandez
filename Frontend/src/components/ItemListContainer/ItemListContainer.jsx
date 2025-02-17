import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext';
import ItemList from '../ItemList/ItemList';
import SearchBar from '../SearchHomeForm/SearchBar/SearchBar';
import ContactForm from '../Forms/ContactForm/ContactForm';
import './ItemListContainer.css';
import { useParams, useNavigate } from 'react-router-dom';

const ItemListContainer = () => {
  const { properties, filters, updateFilters } = useContext(FiltersContext);
  const { tipo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    const fromHome = sessionStorage.getItem('fromHome');

    if (!fromHome) {
      // Restaurar la posición del scroll solo si no viene desde Home
      const scrollPosition = parseInt(sessionStorage.getItem('scrollPosition'), 10);
      if (scrollPosition && !isNaN(scrollPosition)) {
        window.scrollTo(0, scrollPosition);
      }
    } else {
      // Remover la bandera después de la primera navegación
      sessionStorage.removeItem('fromHome');
    }

    return () => {
      // Guardar la posición de scroll en el desmontaje
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };
  }, []);

  const handlePropertyClick = (propertyId) => {
    // Guardar la posición actual antes de navegar
    sessionStorage.setItem('scrollPosition', window.scrollY);
    navigate(`/property/${propertyId}`);
  };

  return (
    <Container className="item-list-container">
      <SearchBar filters={filters} updateFilters={updateFilters}  />
      <ItemList properties={properties} onPropertyClick={handlePropertyClick} />
      <ContactForm className="my-5" />
    </Container>
  );
};

export default ItemListContainer;
