import { Button, CardFooter } from "@material-tailwind/react";
import React from "react";

const CardReview = ({ filteredItem }) => {
    return (
        <div className="max-w-xs mx-auto">
          <div>
            <p>User: {filteredItem.customer.userName}</p>
            <p>Comment: {filteredItem.comment}</p>
            <p>Rating: {filteredItem.review}</p>
            </div>
        </div>
      );
  }

export default CardReview;
