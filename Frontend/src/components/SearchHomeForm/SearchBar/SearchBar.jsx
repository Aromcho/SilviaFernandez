import { useState } from "react"
import { Form } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import { Row, Col } from "react-bootstrap"
import axios from "axios"
import "./SearchBar.css"

const SearchBar = ({ filters, updateFilters }) => {
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([])

  const handleSearchChange = async (e) => {
    const query = e.target.value
    updateFilters({ searchQuery: query })

    if (query.length > 2) {
      try {
        const response = await axios.get("/api/property/autocomplete", {
          params: { query },
        })
        setAutocompleteSuggestions(response.data)
      } catch (error) {
        console.error("Error en el autocompletado:", error)
      }
    } else {
      setAutocompleteSuggestions([])
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    updateFilters({ searchQuery: suggestion.value })
    setAutocompleteSuggestions([])
  }

  return (
    <Row className="search-bar-row">
      <Col>
        <div className="search-bar-wrapper">
          <FaSearch className="search-icon" />
          <Form.Control
            type="text"
            className="search-input"
            value={filters.searchQuery || ""}
            placeholder="Buscar por ubicación..."
            onChange={handleSearchChange}
          />
          {autocompleteSuggestions.length > 0 && (
            <div className="autocomplete-dropdown">
              <ul>
                {autocompleteSuggestions.map((suggestion) => (
                  <li key={suggestion.value} onClick={() => handleSuggestionSelect(suggestion)}>
                    {suggestion.value} {suggestion.secundvalue && ` - ${suggestion.secundvalue}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default SearchBar

