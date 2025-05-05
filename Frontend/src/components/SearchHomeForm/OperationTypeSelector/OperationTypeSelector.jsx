"use client"
import { Row, Col } from "react-bootstrap"
import "./OperationTypeSelector.css"

const operationTypeOptions = [
  { value: "Venta", label: "Venta" },
  { value: "Alquiler", label: "Alquiler", className: "hide-on-mobile" },
  //{ value: "Alquiler temporario", label: "Alquiler Temporal", },
]

const OperationTypeSelector = ({ filters, updateFilters }) => {
  const handleOperationTypeClick = (value) => {
    updateFilters({ operation_type: [value] })
  }

  return (
    <Row className="">
      <Col>
        <div className="operation-tabs">
          {operationTypeOptions.map((option) => (
            <div
              key={option.value}
              className={`operation-tab ${option.className || ""} ${filters.operation_type.includes(option.value) ? "active" : ""}`}
              onClick={() => handleOperationTypeClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </Col>
    </Row>
  )
}

export default OperationTypeSelector

