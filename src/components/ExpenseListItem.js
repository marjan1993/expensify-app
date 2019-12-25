import React from "react";
import { Link } from 'react-router-dom';


const ExpensesListItem = ({ id, description, amount, createdAd }) => (
    <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
       <p>{amount} - {createdAd}</p>
    </div>
);

export default ExpensesListItem;