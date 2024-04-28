import { FILT_BY_PRICE } from "../actions-types";

export const filtByPrice=(price)=>{
    return {
        type: FILT_BY_PRICE,
        payload: price,
      };
    };
