import React from "react";
import "./Layout.css"; // Archivo CSS para los estilos globales y específicos

const Layout = ({ children, menuTheme, footerSmall }) => {
  return (
    <div className="layout-wrapper">
      {children} {/* Aquí se renderizan las rutas */}
      
    </div>
  );
};

export default Layout;
