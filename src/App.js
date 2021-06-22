import {useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //Declarando nuestro estado inicial
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() =>{
    const consultarApi = async () =>{
      if(consultar){
      const appId = '086be6dc67c0e93b9f679676846a2e12'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      const respuesta = await fetch(url)
      const response = await respuesta.json();
      setResultado(response)
      
      if(resultado.cod === '404'){
        setError(true)
      }else {
        setError(false)
      }
      }
    }
    consultarApi();
    setConsultar(false);
  },[consultar])


  let component;

  if(error){
    component = <Error mensaje="No hay resultados" />
  }else {
    component = <Clima resultado={resultado} />
  }

  return (
    <div>
      <Header 
        titulo='Clima React App' />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda} 
                setBusqueda={setBusqueda} 
                setConsultar={setConsultar}/>
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
