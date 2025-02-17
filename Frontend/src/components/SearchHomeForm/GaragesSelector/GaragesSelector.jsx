import React from 'react';
import { Form } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';
import { Col } from 'react-bootstrap';

const GarageOptions = [...Array(6).keys()].map((num) => ({
  value: num + 1,
  label: num + 1,
}));

const GaragesSelector = ({ filters, handleFormChange }) => (
  <Col className="bedrooms-container">
    <div className="bedrooms-wrapper">
      <FaCar className="input-icon" />
      <div className="bedroom-selectors">
        <div className="bedroom-inputs">
          <label className="bedroom-label">Cocheras</label>

          <Form.Select
            className="min-max-input"
            value={filters.min_garages}
            onChange={(e) => handleFormChange('min_garages', e.target.value)}
          >
            <option value="">Mín</option>
            {GarageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>

          <span className="separator">|</span>

          <Form.Select
            className="min-max-input"
            value={filters.max_garages}
            onChange={(e) => handleFormChange('max_garages', e.target.value)}
          >
            <option value="">Máx</option>
            {GarageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
    </div>
  </Col>
);

export default GaragesSelector;
