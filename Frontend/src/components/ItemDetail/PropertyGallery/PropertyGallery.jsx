import React, { useState } from 'react';
import Slider from 'react-slick';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close as CloseIcon } from '@mui/icons-material';
import '../ItemDetail.css';
import { Row, Col } from 'react-bootstrap';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIos
        className={className}
        style={{
          ...style,
          width: 50,
          height: 50,
          display: 'block',
          color: 'white',
          right: 10,
          zIndex: 1,
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)',
          borderRadius: '50%',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.4)',
          padding: 13,
          transition: 'all 0.3s ease',
        }}
        onClick={onClick}
      />
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIos
        className={className}
        style={{
          ...style,
          width: 50,
          height: 50,
          display: 'block',
          color: 'white',
          left: 10,
          zIndex: 1,
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)',
          borderRadius: '50%',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.4)',
          padding: 13,
          transition: 'all 0.3s ease',
        }}
        onClick={onClick}
      />
    );
  };
const PropertyGallery = ({ photos = [], videos = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const sliderSettings = {
    dots: false, // Desactiva los puntitos
    initialSlide: 0, // Posicionamiento inicial
    infinite: true,
    speed: 500,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: false,
    autoplay: false,
    autoplaySpeed: 15000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          initialSlide: 0,
          slidesToShow: 2.1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <>
      <Row className="align-items-center">
        <Col className="p-0 m-0">
          <Slider
            {...sliderSettings}
            className="image-wrapper-detail-container"
          >
            {videos.map((video, index) => (
              <div key={index} className="image-wrapper-detail">
                <iframe
                  src={video.player_url}
                  title={`Video ${index}`}
                  className="img-fluid mb-2 main-image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  allowFullScreen
                />
              </div>
            ))}
            {photos?.map((image, index) => (
              <div key={index} className="image-wrapper-detail">
                <img
                  src={image.image || "/path/to/default-image.jpg"}
                  alt={`Property Image ${index}`}
                  className="img-fluid mb-2 main-image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsOpen(true);
                  }}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
      {isOpen && (
        <Dialog
          style={{ zIndex: 100000001 }}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            style: {
              backgroundColor: "transparent", 
              boxShadow: "none",
            },
          }}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.98)", 
            },
          }}
        >
          <DialogContent
            style={{
              margin: 0,
              padding: 0,
              overflow: "hidden",
              backgroundColor: "transparent", 
            }}
          >
            <div
              className="dialog-image-container p-0 m-0"
              style={{ position: "relative", textAlign: "center" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                {selectedImageIndex + 1}/{photos.length}
              </div>

              <IconButton
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "white",
                }}
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </IconButton>

              <IconButton
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  color: "white",
                }}
                onClick={handlePrevImage}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  color: "white",
                }}
                onClick={handleNextImage}
              >
                <ArrowForwardIos />
              </IconButton>

              <img
                src={photos[selectedImageIndex]?.image}
                alt={`Property Image ${selectedImageIndex}`}
                style={{ width: "auto", height: "auto", maxHeight: "90vh" }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PropertyGallery;
