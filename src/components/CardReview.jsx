import { Button, CardFooter } from "@material-tailwind/react";
import React from "react";

const CardReview = ({ filteredItem }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-100 dark:border-pink-100">
          <div>
            <p>{filteredItem.customer.userName}</p>
            <p>{filteredItem.comment}</p>
            <p>{filteredItem.comment}</p>
            <p>Puntuacion: {filteredItem.review}</p>
            </div>
        </div>
      );
  }

export default CardReview;
