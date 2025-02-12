import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Typography } from '@mui/material';
import Item from '../../components/Item/Item.jsx';
import Skeleton from '@mui/material/Skeleton'; 
import "./TerrenosItemList.css";
import ContactForm from '../../components/Forms/ContactForm/ContactForm.jsx';

const TerrenosItemList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const totalPages = Math.ceil(totalProperties / limit);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/property/properties?limit=${limit}&offset=${offset}&property_type=Terreno`)
      .then(response => response.json())
      .then(data => {
        setProperties(data.objects);
        setTotalProperties(data.meta.total_count);
      })
      .catch(error => console.error('Error al obtener propiedades:', error))
      .finally(() => setLoading(false));
  }, [offset]);

  useEffect(() => {
    setCurrentPage(Math.floor(offset / limit) + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [offset]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setOffset(currentPage * limit);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setOffset((currentPage - 2) * limit);
  };

  const handlePageClick = (page) => {
    setOffset((page - 1) * limit);
  };

  const getPagesToShow = () => {
    const pages = [];
    const maxPagesToShow = 4;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <header className="hero-section mt-5 pt-5">
        <Container className="text-center text-white mt-5 pt-5">
          <Typography variant="h3" className="hero-title">Lotes - Terrenos en Venta en Mar Azul</Typography>
          <p className="hero-subtitle">Encuentra el terreno ideal para construir tu sueño.</p>
        </Container>
      </header>
      
      <Container className='px-0 mt-5'>
        <div className="item-list">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <div className="Item mb-2" key={index}>
                <Skeleton variant="rectangular" height={300} />
                <div className="card-body">
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" />
                  <div className="property-info d-flex justify-content-around mt-2 mb-2">
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="rectangular" width={50} height={50} />
                  </div>
                </div>
              </div>
            ))
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <Item className="Item" key={property.id} property={property} />
            ))
          ) : (
            <p>No se encontraron terrenos disponibles.</p>
          )}
        </div>

        <Row className="pagination-cont my-5 align-items-center justify-content-between">
          <Col xs="auto" className="text-start">
            {currentPage > 1 && (
              <FaChevronLeft className="pagination-arrow" onClick={handlePreviousPage} />
            )}
          </Col>
          <Col xs="auto" className="text-center">
            {getPagesToShow().map((page) => (
              <span key={page} className={`pagination-page ${page === currentPage ? 'active' : ''}`} onClick={() => handlePageClick(page)}>
                {page}
              </span>
            ))}
          </Col>
          <Col xs="auto" className="text-end">
            {currentPage < totalPages && (
              <FaChevronRight className="pagination-arrow" onClick={handleNextPage} />
            )}
          </Col>
        </Row>
      </Container>
      <ContactForm className="my-5" />
    </>
  );
};

export default TerrenosItemList;
