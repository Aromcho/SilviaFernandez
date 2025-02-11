// src/components/ChatModal/ChatModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IoSendSharp } from "react-icons/io5";

import './ChatModal.css';

const ChatModal = ({ show, onHide }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const whatsappURL = `https://wa.me/542255509408?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    onHide();
  };

return (
    <Modal show={show} onHide={onHide} centered className="chat-modal">
        <Modal.Header closeButton className="chat-modal-header">
            <Modal.Title className="d-flex flex-row align-items-center">
                    {/* imagen para el chat */}
                    <img src="/images/portada.jpg" alt="Dolores Pidre" className="chat-logo" />
                    <p className="ms-2">Silvia Fernandez</p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="chat-modal-body">
            <div className="message-container">
                <div className="message received">
                    <p>Hola! ¿En qué puedo ayudarte?</p>
                </div>
            </div>
            <Form.Group controlId="message" className="message-input-container d-flex flex-row">
                <Form.Control
                    as="textarea"
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="message-input flex-grow-1"
                />
                <Button onClick={handleSendMessage} className="send-button ms-2" disabled={!message.trim()}>
                <IoSendSharp />
                </Button>
            </Form.Group>
        </Modal.Body>
    </Modal>
);
};

export default ChatModal;
