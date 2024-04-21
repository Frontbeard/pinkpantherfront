import React from "react";
import aboutUs from "../../public/aboutus.png"

const AboutUs = () => {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8 flex bg-gray-100">
        <div className="w-1/2 pr-8 ">
          <img src={aboutUs} alt="about us" className="w-full" />
        </div>
        <div className="w-1/2">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Acerca de PINKPANTHER</h1>
            <p className="text-lg text-gray-600">
            Soy María José, fundadora de PinkPanther, una marca nacida de la pasión y la necesidad de adaptarse a los tiempos de la pandemia en 2020. Como docente, busqué formas de contribuir y crecer, y encontré inspiración en el deporte como fuente de bienestar personal. Con valentía, hice mi primer pedido de ropa deportiva, y contra todo pronóstico, vendí todo en una semana. Este éxito inicial fue el comienzo de PinkPanther, un proyecto que ha crecido con cada venta online y cada entrega a domicilio. PinkPanther es más que indumentaria deportiva; es un sueño hecho realidad, compartido con una comunidad que valora el esfuerzo y la calidad.            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;