import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaEllipsisH, FaSync, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { changePage } from '../redux/actions/Pagination/changePage'; // Corregir la ruta de importación

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center mt-4">
      {/* Botón para ir a la primera página */}
      <button
        onClick={() => handlePageChange(1)}
        className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
      >
        <FaAngleDoubleLeft />
      </button>

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

      {/* Botón para ir a la última página */}
      <button
        onClick={() => handlePageChange(totalPages)}
        className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
      >
        <FaAngleDoubleRight />
      </button>

      {/* Mostrar una elipsis */}
     {/* <span className="mx-2">
        <FaEllipsisH />
    </span>*/}

      {/* Botón para recargar la página actual */}
      {/*<button
        onClick={() => handlePageChange(currentPage)}
        className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
      >
        <FaSync />
  </button>*/}

      {/* Botones para navegación rápida */}
     {/* <button
        onClick={() => handlePageChange(currentPage - 5)} // Retroceder 5 páginas
        className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
      >
        <FaStepBackward />
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 5)} // Avanzar 5 páginas
        className="px-8 py-3 text-lg text-pink-400 hover:underline hover:bg-pink-600 hover:text-white duration-300 rounded-md mr-2"
      >
        <FaStepForward />
</button>*/}
    </div>
  );
};

export default Pagination;