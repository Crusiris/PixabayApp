import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListImages from './components/ListImages';




function App() {
  //Estado para obtener y manejar el termino desde el componente formulario
const [search, saveSearch] = useState('');
//Estado para guardar el resultado de la peticion
const [ images, saveImages ] = useState([]);
//Estado para obtener y manejar la pagina actual
const [ actualPage, saveActualPage ] = useState(1);
//Estado para obtener y manejar el total de paginas
const [ totalPage, saveTotalPage ] = useState(1);


useEffect(()=>{
 
  const getApi = async ()=>{
     //Validando que exista un campo
    if(search === '') return;

    const imgPag = 30;
    const key = '11469913-e19f74ca367a58d062c6eddf8';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imgPag}&page=${actualPage}`;

    const resp = await fetch(url);
    const result = await resp.json();
    saveImages(result.hits);

    //Calculando el total de paginas
    const totalPages = Math.ceil(result.totalHits / imgPag );
    saveTotalPage(totalPages);

    //Scroll hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior:'smooth'});

  }
  getApi();
},[search, actualPage]);


//Definiendo la pagina anterior
const pageBack = () =>{
  const newActualPage = actualPage - 1;

  if(newActualPage === 0 )return;
  saveActualPage(newActualPage);
}

//Definiendo la pagina siguiente
const pagNext = () =>{
  const newActualPage = actualPage + 1;
  if(newActualPage > totalPage) return;
  saveActualPage(newActualPage);
}

  return (
   
   <div className="container">
     <div className="jumbotron">
        <p className="lead text-center"> Buscardo de Imagenes</p>
        <Form
        saveSearch = {saveSearch}
        />

     </div>

      <div className="row justify-content-center" >
         <ListImages
         images={images}
         />

        {(actualPage === 1)? null : 
        (
         <button
         type="button"
         className="bbtn btn-info mr-1"
         onClick={pageBack}
         >&laquo; Anterior </button>
        )}

         { (actualPage === totalPage)? null :
           (
            <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={pagNext}
            > Siguiente &raquo;</button>
           ) }

      </div>
   </div>
  );
}

export default App;
