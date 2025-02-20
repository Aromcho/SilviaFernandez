import React from "react";
import QRCode from "react-qr-code";
import "./Print.css";
import { formatToMoney } from "../../helpers/index.js";
import { FaHeart, FaBed, FaBath, FaCar, FaRulerCombined,FaArrowsAltV, FaArrowsAltH  } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";



const Print = React.forwardRef(({ property, photoAmount }, ref) => {
  const photoGallery = property?.photos
    ?.filter((item) => !item.is_blueprint)
    .map((item) => ({
      src: `${item.image}`,
      loading: "lazy",
    }));
  return (
    <table className="property-pdf" id="pdfItem" ref={ref}>
      <thead>
        <tr>
          <th colSpan={2} style={{ display: "flex" }}>
            <div className="header">
              <img src="/images/logo-sf.png" alt="Belga" className="logo" />
              <div className="header-content">
                <span className="address-title">{property.address}</span>
                <span className="header-subtitle">
                  {property.publication_title}
                </span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2}>
            <div className="center-column">
              <div className="main-title-container">
                <div className="title-new">
                  <img src="/images/logo-sf.png" alt="" className="img-logo" />
                </div>
              </div>
              <div className="contact-new">
                  <span className="">
                  <MdPhoneAndroid size={26} /> 2255463051
                  </span>
                  <span>
                  <IoLogoWhatsapp size={26} /> +5492255509408
                  </span>
                  <span className="">
                  <IoIosMail size={26} /> braicesfernandez@gmail.com
                  </span>

              </div>
              <div className="grid-container">
                <div className="main-image">
                  <img
                    src={photoGallery[0]?.src}
                    alt="Main property image"
                    style={{ width: "100vw", height: "100vh" }}
                  />
                </div>
              </div>
              <div className="center-header">
                <span className="address-title">{property.address}</span>
                <span className="header-subtitle-2"> {property.publication_title}</span>
                <div className="main-price-container">
                  <span className="main-price">
                    <span className="main-price-coin">
                      {property?.operations[0]?.prices[0]?.currency}
                      <span> </span>
                      {formatToMoney(property?.operations[0]?.prices[0]?.price)}
                    </span>
                    <span>|</span>
                    <p className="rooms">
  {[
    Math.round(property?.surface) > 0 && (
      <div className="icon-item" key="surface">
        <span className="icon-label">{Math.round(property?.surface)}</span>
        <FaRulerCombined size={26} />
      </div>
    ),
    Math.round(property?.suite_amount) > 0 && (
      <div className="icon-item" key="suite">
        <span className="icon-label">{Math.round(property?.suite_amount)}</span>
        <FaBed size={26} />
      </div>
    ),
    Math.round(property?.bathroom_amount) > 0 && (
      <div className="icon-item" key="bathroom">
        <span className="icon-label">{Math.round(property?.bathroom_amount)}</span>
        <FaBath size={26} />
      </div>
    ),
    Math.round(property?.parking_lot_amount) > 0 && (
      <div className="icon-item" key="parking">
        <span className="icon-label">{Math.round(property?.parking_lot_amount)}</span>
        <FaCar size={26} />
      </div>
    ),
  ]
    .filter(Boolean) // Filtra los valores falsos para evitar elementos vacíos
    .map((item, index, array) => (
      <React.Fragment key={index}>
        {item}
        {index < array.length - 1 && <span className="sep">|</span>}
      </React.Fragment>
    ))}
</p>

                  </span>
                  <div className="icon-list">
                  
                </div>
                  
                </div>
                <div className="small-images">
                  <div className="fondo-planco bg-white ">
                   
                  <QRCode
                      size={160}
                      value={`https://silviafernandez.mi-hogar.online/propiedad/${property.id.toString()}`}
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                    
                  </div>
              </div>
              
            </div>
            
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="content-wrapper">
              <div className="left-column">
                <div className="icon-list">
                  {Math.round(property?.total_surface) > 0 && (
                    <div className="icon-item">
                      <span className="icon-label">
                        {Math.round(property?.total_surface)}
                      </span>
                      <img src="/images/svg/m2.svg" className="icon-image" />
                    </div>
                  )}
                  {Math.round(property?.suite_amount) > 0 && (
                    <div className="icon-item">
                      <span className="icon-label">
                        {Math.round(property?.suite_amount)}
                      </span>
                      <img src="/images/svg/room.svg" className="icon-image" />
                    </div>
                  )}
                  {Math.round(property?.bathroom_amount) > 0 && (
                    <div className="icon-item">
                      <span className="icon-label">
                        {Math.round(property?.bathroom_amount)}
                      </span>
                      <img src="/images/svg/bath.svg" className="icon-image" />
                    </div>
                  )}
                  {Math.round(property?.parking_lot_amount) > 0 && (
                    <div className="icon-item">
                      <span className="icon-label">
                        {Math.round(property?.parking_lot_amount)}
                      </span>
                      <img
                        src="/images/svg/car.svg"
                        className="icon-image fix"
                      />
                    </div>
                  )}
                </div>
                <div
                  className="description-text"
                  dangerouslySetInnerHTML={{
                    __html: property.rich_description,
                  }}
                />
              </div>
              <div className="right-column">
                <div className="gallery-list fixes">
                  {photoGallery.slice(4, 8).map((item, index) => (
                    <div className="gallery-item" key={index}>
                      <img
                        src={item.src}
                        alt={`property image ${index + 1}`}
                        style={{ width: "100%" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="gallery-list fixes">
                  {photoGallery.slice(8).map((item, index) => (
                    <div className="gallery-item" key={index}>
                      <img
                        src={item.src}
                        alt={`property image ${index + 5}`}
                        style={{ width: "100%", height: "173px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>
            <div className="footer">{/* Footer content */}</div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
});

export default Print;
