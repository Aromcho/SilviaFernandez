import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PATHS } from "../../../config/index.js";
import { classes, truncateWithEllipsis } from "../../helpers/index.js";
import { useMergeState } from "../../helpers/hooks.js";
import Lightbox from "react-spring-lightbox";
import Layout from "../../components/Layout/Layout.jsx";
import { ArrowBackIcon, ArrowSubmitIcon, CloseIcon } from "../../components/Icons/Icons.jsx";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import { MemberCard } from "./MemberCard/MemberCard.jsx";
import { QuoteCard } from "./QuoteCard/QuoteCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "react-bootstrap";
import ContactForm from "../../components/Forms/ContactForm/ContactForm.jsx";
import PozoCard3D from "../../components/PozoConstruccion/PozoCard3D/PozoCard3D.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ConoceBelga.css"; // Importar el CSS de forma clásica

const ConoceBelga = observer(() => {
  const [activeSection, setActiveSection] = React.useState("");
  const [modalContent, setModalContent] = useMergeState({ open: false, content: "fotos" });
  const [currentImageIndex, setCurrentIndex] = React.useState(0);

  const onClose = () => setModalContent({ open: false });
  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const gotoNext = () =>
    currentImageIndex + 1 < (modalContent.content === "fotos" && photoGallery.length) &&
    setCurrentIndex(currentImageIndex + 1);

  const photos = ["/images/servicios_fotos.jpg", "/images/servicios_planos.jpg"];
  const photoGallery = photos?.map((image) => ({ src: `${image}`, loading: "lazy", alt: `${image}` }));

  return (
    <Layout menuTheme="light" footerSmall backToTopFooter>
      <div className="cb-container">
        <div className="cb-hero-wrapper" style={{ backgroundImage: `url(/images/portada.jpg)` }}>
          <div className="cb-black-layer"></div>
          <div className="cb-hero">
            <SocialSidebar />
          </div>
            <div className="cb-menu-hero">
              <a className={classes({ active: activeSection === "historia" })} href="#historia">
                <div className="cb-menu-hero-text">Historia</div>
              </a>
              <a className={classes({ active: activeSection === "valores" })} href="#valores">
                <div className="cb-menu-hero-text">Valores</div>
              </a>
              <a className={classes({ active: activeSection === "belga" })} href="#belga">
                <div className="cb-menu-hero-text">Sobre Nosotros</div>
              </a>
              <a className={classes({ active: activeSection === "servicios" })} href="#servicios">
                <div className="cb-menu-hero-text">Servicios</div>
              </a>
              <a className={classes({ active: activeSection === "oficinas" })} href="#oficinas">
                <div className="cb-menu-hero-text">Oficinas</div>
              </a>
            </div>
        </div>

        <Container>
          <div className="cb-back-wrapper">
            <Link className="text-black" to={PATHS.ROOT}>
              <ArrowBackIcon />
              Volver al inicio
            </Link>
          </div>
        </Container>

        <div className="cb-sidebar-container">
          <div className="cb-sidebar-red">
            <SocialSidebar color="red" />
            <BackToTop color="red" />
          </div>

          <section
            className="cb-historia-section"
            id="historia"
            onMouseOver={() => setActiveSection("historia")}
            onMouseLeave={() => setActiveSection("")}
          >
            <Container>
              <div className="cb-historia-wrapper">
                <div className="cb-historia-left">
                  <PozoCard3D/>
                </div>
                <div className="cb-historia-right">
                  <div className="cb-historia-text-wrapper">
                    <div className="cb-underline-title">
                      Silvia Fernandez Inmobiliaria, una <u>Historia</u> de éxito
                    </div>



                    <p className="cb-historia-text">
                    Silvia Fernandez Inmobiliaria es sinónimo de compromiso, excelencia y confianza en el mercado inmobiliario. Hemos logrado conectar a innumerables familias y empresas con la propiedad ideal, brindando un servicio transparente y personalizado.
                    </p>
                    <p className="cb-historia-text">
                    Nuestra pasión por el sector nos impulsa a innovar constantemente, ofreciendo un asesoramiento integral basado en un profundo conocimiento del mercado. Cada operación es gestionada con profesionalismo y dedicación, asegurando que cada cliente reciba la atención que merece.
                    </p>
                    <p className="cb-historia-text">
                    En Silvia Fernandez Inmobiliaria, no solo vendemos propiedades, creamos hogares, oportunidades y futuros. Nuestra reputación se construye sobre valores sólidos: integridad, compromiso y una atención cercana que marca la diferencia en cada transacción.
                    </p>
                    <p className="cb-historia-text">
                    Si buscas un equipo confiable, apasionado y altamente capacitado para guiarte en tu próxima inversión inmobiliaria, Silvia Fernandez Inmobiliaria es tu mejor elección. Descubre la experiencia de trabajar con expertos que ponen tu bienestar en el centro de todo.
                    </p>
                  
                  </div>
                </div>
              </div>
            </Container>
          </section>

          

          <section className="cb-quotes-section">
              <div className="cb-quote-list">
                <QuoteCard className="cb-quote" rating={4} quote={"Agradecidos infinitamente a Silvia, por su amabilidad, cordialidad, siempre bien dispuesta a responder todas las inquietudes y haber podido cumplir nuestro sueño en Mar Azul, con el acompañamiento de Silvia y su equipo de trabajo, lo pudimos lograr, nos dieron mucha tranquilidad y confianza. Super recomendable."} author="Duby Alfonso" logo="/images/google_logo.png" link="#" />
                <QuoteCard className="cb-quote" rating={5} quote={"Excelente equipo de profesionales, con Silvia a la cabeza,  nos sentimos acompañados y lograron los objetivos buscados. Capaces, comprometidos  y buena gente. Super recomendables  a la hora de  hacer cualquier tipo de transacción sea administración, alquiler o venta."} author="Valeria Deferrari" logo="/images/google_logo.png" link="#" />
              </div>
          </section>

          

          
          <section className="cb-oficinas-section">
            <Container>
              <div className="cb-underline-title">Nuestra <u>Oficina</u></div>
            </Container>

            <div className="cb-main-office">
              <div className="cb-main-office-img" style={{ backgroundImage: `url(/images/local.png)` }}></div>
              <div className="cb-office-main-text">
                <div className="cb-office-text-wrapper">
                  <div className="cb-office-text-name">Central</div>
                  <div className="cb-office-text-loc">Calle 34, Mar del Plata &, Mar Azul</div>
                  <div className="cb-office-text">En el centro Mar Azul ¡Vení a conocerla!</div>
                </div>
              </div>
            </div>
             <div className="cb-main-office">
              <div className="cb-main-office-img" style={{ backgroundImage: `url(/images/oficina-sucursal.jpg)` }}></div>
              <div className="cb-office-main-text">
                <div className="cb-office-text-wrapper">
                  <div className="cb-office-text-name">Sucursal </div>
                  <div className="cb-office-text-loc">Av del Plata y Uritorco - Mar de las Pampas</div>
                </div>
              </div>
            </div>

            
          </section>

          <div className="cb-form-wrapper">
            <Container>
              <ContactForm />
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default ConoceBelga;
