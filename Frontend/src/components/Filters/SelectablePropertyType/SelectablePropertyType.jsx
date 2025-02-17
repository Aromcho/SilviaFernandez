import React from 'react';
import { Button } from 'react-bootstrap';
import { FaBuilding, FaHome, FaCity, FaWarehouse, FaTree, FaHotel } from 'react-icons/fa';
import { Col } from 'react-bootstrap';
import "./SelectablePropertyType.css";

const propertyTypeOptions = [
  { value: 'Casa', label: 'Casa', icon: <FaHome /> },
  { value: 'Departamento', label: 'Departamento', icon: <FaCity /> },
  { value: 'PH', label: 'PH', icon: <FaWarehouse /> },
  { value: 'Terreno', label: 'Terrenos', icon: <FaTree /> },
  { value: 'Local', label: 'Locales', icon: <FaBuilding /> },
  { value: 'Hotel', label: 'Complejos', icon: <FaHotel /> },
];

const SelectablePropertyType = ({ filters, handleFormChange }) => (
  <Col className="selectable-property-type-container">
    <div className="selectable-property-type-wrapper">
        <p className='selectable-property-type-title'>Tipo de propiedad</p>
      <div className="property-type-buttons">
        {propertyTypeOptions.map((option) => (
          <Button
            key={option.value}
            className={`property-type-btn ${filters.property_type.includes(option.value) ? 'active' : ''}`}
            onClick={() => handleFormChange('property_type', option.value)}
          >
            {option.icon} {option.label}
          </Button>
        ))}
      </div>
    </div>
  </Col>
);

export default SelectablePropertyType;
