import React, { useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext';
import OperationTypeSelector from './OperationTypeSelector/OperationTypeSelector';
import PropertyTypeSelector from './PropertyTypeSelector/PropertyTypeSelector';
import SearchBar from './SearchBar/SearchBar';
import BedroomsSelector from './BedroomsSelector/BedroomsSelector';
import './SearchHomeForm.css';

const SearchHomeForm = ({ handleSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext);

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  return (
    <div className="search-form">
      <Form onSubmit={handleSubmit} className="filter-form">
        
        {/* Selector de Operación */}
        <OperationTypeSelector filters={filters} updateFilters={updateFilters} />

        {/* Agrupamos PropertyTypeSelector, BedroomsSelector y SearchBar en la misma fila */}
        <Row className="filter-row mb-2">
          <Col md={4}>
            <PropertyTypeSelector filters={filters} handleFormChange={handleFormChange} />
          </Col>
          <Col md={4}>
            <BedroomsSelector filters={filters} handleFormChange={handleFormChange} />
          </Col>
          <Col md={4}>
            <SearchBar filters={filters} updateFilters={updateFilters} />
          </Col>
        </Row>

        {/* Botón de búsqueda */}
        <Row className="filter-row-btn">
          <Button className="search-button" type="submit">
            BUSCAR
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default SearchHomeForm;
