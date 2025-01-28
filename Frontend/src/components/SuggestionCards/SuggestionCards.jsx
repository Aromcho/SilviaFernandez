import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaHotel, FaKey, FaWarehouse } from 'react-icons/fa';
import './SuggestionCards.css';

const SuggestionCards = () => {
    const cards = [
        { title: 'Alquiler Temporal', icon: <FaKey /> },
        { title: 'Casas', icon: <FaHome /> },
        { title: 'Departamentos', icon: <FaBuilding /> },
        { title: 'Dúplex', icon: <FaWarehouse /> },
        { title: 'Hoteles', icon: <FaHotel /> },
    ];

    return (
        <div className="suggestion-cards">
            <div className="suggestion-row">
                {cards.map((card, index) => (
                    <Link to="/temporarylist" key={index} className="suggestion-card">
                        <div className="icon-suggestion-cards">{card.icon}</div>
                        <h3 className="titulo">{card.title}</h3>
                    </Link >
                ))}
            </div>
        </div>
    );
};

export default SuggestionCards;
