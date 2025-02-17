import React, { useContext, useState, useCallback } from 'react';
import { Form, Button, Row, Col, Collapse } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext';
import OperationTypeSelector from '../SearchHomeForm/OperationTypeSelector/OperationTypeSelector';
import SelectablePropertyType from './SelectablePropertyType/SelectablePropertyType';
import BedroomsSelector from '../SearchHomeForm/BedroomsSelector/BedroomsSelector';
import GaragesSelector from '../SearchHomeForm/GaragesSelector/GaragesSelector';
import './Filters.css';

const Filters = ({ handleSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [showFilters, setShowFilters] = useState(false); // Estado para manejar el colapso en móvil


  
  // Cambiar el orden de los precios
  

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  console.log(filters);
  

  return (
    <Form onSubmit={handleSubmit} className="filter-form">
      {/* Botón para mostrar/ocultar filtros en versión móvil */}
      <Row className="d-md-none mt-3">
        <Col>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            aria-controls="filters-collapse"
            aria-expanded={showFilters}
            className="search-button"
          >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </Col>
      </Row>

      {/* Filtros adicionales en móvil (colapsados por defecto) */}
      <Collapse in={showFilters} className="d-md-none">
        <div id="filters-collapse">
          <Row className="filter-row mt-3">
            {/* Filtro por tipo de operación */}
            <Col>
              <OperationTypeSelector filters={filters} updateFilters={updateFilters} />
            </Col>

            {/* Filtro por tipo de propiedad */}
            <Col>
              <SelectablePropertyType filters={filters} handleFormChange={handleFormChange}/>
            </Col>

            {/* Filtro por habitaciones */}
            <Col>
            <BedroomsSelector filters={filters}handleFormChange={handleFormChange}/>
            </Col>

            {/* Filtro por cocheras */}
            <Col>
            <GaragesSelector filters={filters} handleFormChange={handleFormChange} />
            </Col>
          </Row>
        </div>
      </Collapse>

 <div className='search-button-filter p-3'>
        <OperationTypeSelector filters={filters} updateFilters={updateFilters} />


        {/* Filtro por tipo de propiedad */}
        
        <Col className="mb-2">
        <SelectablePropertyType filters={filters} handleFormChange={handleFormChange}/>
        </Col>

        {/* Filtro por habitaciones */}
        <Col className="mb-2">
          <BedroomsSelector filters={filters} handleFormChange={handleFormChange} />
        </Col>

        {/* Filtro por cocheras */}
        <Col>
        <GaragesSelector filters={filters} handleFormChange={handleFormChange} />

        </Col>

      {/* Ordenar por precio */}
      </div>
    </Form>
  );
};

export default Filters;
