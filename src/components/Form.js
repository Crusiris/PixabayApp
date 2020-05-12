import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';



const Form = ({saveSearch}) => {

    //Estado para obtener y manejar los terminos.
const [ finished, saveFinished ]= useState('');

    //Estado para obtener y manejar los errores
const [ error, saveError ]= useState(false);

//Funcion que buscara las imagenes
const searchImage = e =>{
   e.preventDefault();
   

   //validando formulario
   if( finished.trim() === ''){
    saveError(true)
    return;
   }
   saveError(false);

   saveSearch(finished);
}

    return ( 
        <form
        onSubmit={searchImage}
        >
        <div className="row">
            <div className="form-group col-md-8">
                <input 
                type="text"
                
                className="form-control form-control-lg"
                placeholder="Busca una imagen, ejemplo: futbol o cafe"
                onChange={e => saveFinished(e.target.value)}
                />
            </div>

            <div className="form-group col-md-4">
                <input 
                type="submit"
                className="btn btn-lg btn-danger btn-block"
                value="Search"
                />
            </div>
        </div>
        {error ? <Error message="El termino es obligatorio"/>: null}
        </form>
     );
}
 
Form.propTypes = {
    saveSearch: PropTypes.func.isRequired
} 

export default Form;