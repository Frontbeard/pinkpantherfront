
import React from 'react';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaEllipsisH, FaSync, FaStepBackward, FaStepForward } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Verificar si la página actual es la primera página
  const isFirstPage = currentPage === 1;

  // Verificar si la página actual es la última página
  const isLastPage = currentPage === totalPages;

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    // Asegurar que la página esté dentro del rango válido (1 - totalPages)
    if (page < 1) {
      onPageChange(1); // Si la página es menor que 1, establecer la página actual en 1
    } else if (page > totalPages) {
      onPageChange(totalPages); // Si la página es mayor que totalPages, establecer la página actual en totalPages
    } else {
      onPageChange(page); // Establecer la página actual en la página proporcionada
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {/* Botón para ir a la página anterior, deshabilitado en la primera página */}
      {!isFirstPage && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
        >
          <FaChevronLeft /> Anterior
        </button>
      )}

       {/* Mostrar el número de página actual y el total de páginas */}
<span className="mx-6 text-xl font-bold">
  Página {currentPage} de {totalPages}
</span>


      {/* Botón para ir a la página siguiente, deshabilitado en la última página */}
      {!isLastPage && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
        >
          Siguiente <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;