import React, { useContext, useState } from 'react';
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
    <Container className="search-form">
      <Form onSubmit={handleSubmit} className="filter-form">
        
        <OperationTypeSelector filters={filters} updateFilters={updateFilters} />

        <Row className="filter-row mb-2">
          <PropertyTypeSelector filters={filters} handleFormChange={handleFormChange} />

          <BedroomsSelector filters={filters} handleFormChange={handleFormChange} />
        </Row>

        <SearchBar filters={filters} updateFilters={updateFilters} />

        <Row className="filter-row">
          <Col md="auto">
            <Button className="search-button" type="submit">
              BUSCAR
            </Button>
          </Col>
        </Row>
        
      </Form>
    </Container>
  );
};

export default SearchHomeForm;
