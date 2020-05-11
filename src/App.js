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
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imgPag}`;

    const resp = await fetch(url);
    const result = await resp.json();
    saveImages(result.hits);

    //Calculando el total de paginas
    const totalPages = Math.ceil(result.totalHits / imgPag );
    saveTotalPage(totalPages);

  }
  getApi();
},[search])

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
      </div>
   </div>
  );
}

export default App;
