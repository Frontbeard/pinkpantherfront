import React from 'react'
import AddingImages from './AddingImages';
import { Link } from 'react-router-dom';

const FormCreacion =()=>{
    return(
        <div>
      <Link to="/formCreacion"><AddingImages/></Link>
        </div>
    )
}

export default FormCreacion;