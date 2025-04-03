import { Form } from "react-bootstrap"
import { FaBed } from "react-icons/fa"
import { Col } from "react-bootstrap"
import "./BedroomsSelector.css"

const BedroomOptions = [...Array(6).keys()].map((num) => ({
  value: num + 1,
  label: num + 1,
}))

const BedroomsSelector = ({ filters, handleFormChange }) => (
  <Col md={6} className="bedrooms-container">
    <div className="bedrooms-wrapper">
      <FaBed className="input-icon" />
      <div className="bedroom-selectors">
        <div className="bedroom-inputs">
          <label className="bedroom-label">Dorms.</label>

          <Form.Select
            className="min-max-input"
            value={filters.min_rooms || ""}
            onChange={(e) => handleFormChange("min_rooms", e.target.value)}
          >
            <option value="">Mín</option>
            {BedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>

          <span className="separator">|</span>

          <Form.Select
            className="min-max-input"
            value={filters.max_rooms || ""}
            onChange={(e) => handleFormChange("max_rooms", e.target.value)}
          >
            <option value="">Máx</option>
            {BedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
    </div>
  </Col>
)

export default BedroomsSelector

