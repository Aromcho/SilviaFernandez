import React from 'react';
import './OperationTypeSelector.css';

const operationTypeOptions = [
  { value: 'Venta', label: 'Venta' },
  { value: 'Alquiler', label: 'Alquiler', className: 'hide-on-mobile' }, // Clase para ocultarlo en mobile
  { value: 'Alquiler temporario', label: 'Alquiler Temporario' },
];

const OperationTypeSelector = ({ filters, updateFilters }) => {
  const handleOperationTypeClick = (value) => {
    updateFilters({ operation_type: [value] });
  };

  return (
    <div className="operation-type-buttons">
      {operationTypeOptions.map((option) => (
        <div
          key={option.value}
          className={`operation-type-button ${option.className || ''} ${filters.operation_type.includes(option.value) ? 'active' : ''}`}
          onClick={() => handleOperationTypeClick(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default OperationTypeSelector;
