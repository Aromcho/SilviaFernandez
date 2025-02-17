import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { FiltersContext } from '../../context/FiltersContext';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const FilterActions = () => {
      const { filters, updateFilters } = useContext(FiltersContext);
    
      const [order, setOrder] = useState(filters.sortOrder || 'desc'); // Estado para manejar el orden del precio


     
      const toggleSortOrder = () => {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        setOrder(newOrder);
        updateFilters({ order: newOrder }); // Actualizamos el estado en los filtros
      };
  return (
    <>
      <Row className="filter-row d-none d-md-flex  mx-5">
        <Col className="d-flex justify-content-end">
          <Button onClick={toggleSortOrder} variant="light" className="custom-button">
            Ordenar por precio {order === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
          </Button>
        </Col>
      </Row>
      
    </>
  );
};

export default FilterActions;
