import React from 'react';
import { Form } from 'react-bootstrap';
import { FaBuilding } from 'react-icons/fa';
import { Col } from 'react-bootstrap';
import "./PropertyTypeSelector.css";

const propertyTypeOptions = [
  { value: 'Casa', label: 'Casa' },
  { value: 'Departamento', label: 'Departamento' },
  { value: 'PH', label: 'PH' },
  { value: 'Terreno', label: 'Terrenos' },
  { value: 'Oficina', label: 'Oficinas' },
  { value: 'Cochera', label: 'Cocheras' },
  { value: 'Local', label: 'Locales' },
  { value: 'Hotel', label: 'Hoteles' },
];

const PropertyTypeSelector = ({ filters, handleFormChange }) => (
  <Col className="property-type-container">
    <div className="property-type-wrapper">
      <FaBuilding className="input-icon"  />
      <Form.Select
        className="property-type-select"
        value={filters.property_type || ""}
        onChange={(e) => handleFormChange('property_type', [e.target.value])}
      >
        <option style={{ color: '#888888' }} value="">Tipo de Propiedad</option>
        {propertyTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  </Col>
);

export default PropertyTypeSelector;
