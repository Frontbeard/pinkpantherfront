import React from "react";

const AboutUs = () => {
  return (
    <section class="overflow-hidden bg-gray-50 dark:bg-gray-100 md:pt-0 sm:pt-16 2xl:pt-16 mt-16 pb-0">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">
          <div>
            <h2 class="text-3xl font-bold leading-tight text-blacksm:text-4xl lg:text-5xl">
              Bienvenidos a <br class="block sm:hidden" />
              <span class="text-pink-400">PinkPanther</span>
            </h2>
            <p class="max-w-lg mt-3 text-xl leading-relaxed text-black md:mt-8">
              Mi nombre es María José, fundadora de PinkPanther, una marca
              nacida de la pasión y la necesidad de adaptarse a los tiempos de
              la pandemia en 2020.
            </p>
            <p class="max-w-lg mt-3 text-xl leading-relaxed text-black md:mt-8">
              Como docente, busqué formas de contribuir y crecer, y encontré
              inspiración en el deporte como fuente de bienestar personal. Con
              valentía, hice mi primer pedido de ropa deportiva, y contra todo
              pronóstico, vendí todo en una semana. Este éxito inicial fue el
              comienzo de PinkPanther, un proyecto que ha crecido con cada venta
              online y cada entrega a domicilio. PinkPanther es más que
              indumentaria deportiva; es un sueño hecho realidad, compartido con
              una comunidad que valora el esfuerzo y la calidad.
            </p>

            <p class="mt-4 text-xl text-black md:mt-8">
              <span class="relative inline-block">
                <span class="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
              </span>
              <br class="block sm:hidden" />
              Contactame por{" "}
              <a
                href="https://www.instagram.com/pink.pantherindumentaria"
                title=""
                target="_blank"
                class="transition-all duration-200 text-pink-400 dark:text-pink-400 hover:text-pink-300 dark:hover:text-pink-300 hover:underline"
              >
                Instagram
              </a>
            </p>
          </div>

          <div class="relative">
            <img
              class="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
