import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaHotel, FaKey, FaTree } from 'react-icons/fa';
import { FiltersContext } from '../../context/FiltersContext';
import './SuggestionCards.css';

const SuggestionCards = () => {
    const navigate = useNavigate();
    const { updateFilters } = useContext(FiltersContext);

    const cards = [
        { title: 'Alquiler', icon: <FaKey />, filter:  { operation_type: ['Alquiler'] }, path: '/propertylist' },
        { title: 'Lotes - Terrenos', icon: <FaTree />, path: '/terrenos' },
        { title: 'Casas', icon: <FaHome />, filter: { property_type: ['Casa'] }, path: '/propertylist' },
        { title: 'Departamentos', icon: <FaBuilding />, filter: { property_type: ['Departamento'] }, path: '/propertylist' },
        { title: 'Complejos', icon: <FaHotel />, filter: { property_type: ['Hotel'] }, path: '/propertylist' },
    ];

    const handleCardClick = (filter, path) => {
        updateFilters(filter);
        navigate(path);
    };

    return (
        <div className="suggestion-cards">
            <div className="suggestion-row">
                {cards.map((card, index) => (
                    <div key={index} className="suggestion-card" onClick={() => handleCardClick(card.filter, card.path)}>
                        <div className="icon-suggestion-cards">{card.icon}</div>
                        <h3 className="titulo">{card.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestionCards;
