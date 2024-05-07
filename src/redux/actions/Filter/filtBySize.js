import { FILT_BY_SIZE } from "../actions-types"; 

// Acción para filtrar productos por tamaño
export const filtBySize = (size) => {
  return {
    type: FILT_BY_SIZE,
    payload: size
  };
};

export default filtBySize;