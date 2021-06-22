import {useState} from 'react';

const Formulario = ({busqueda, setBusqueda, setConsultar}) =>{
    const [error, setError] = useState(false);

    //Destructuring del estado
    const {ciudad, pais} = busqueda;


    //Funcion que actualiza el state
    const handleChange = e =>
        //Actualizar el estado
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })

        const handleSubmit = e =>{
            e.preventDefault();

            //Validar
            if(ciudad.trim() === '' || pais.trim() === ''){
                setError(true);
                return;
            }
            setError(false);
            setConsultar(true);
        }


    return(
        <form onSubmit={handleSubmit}>
            {error && <p className="red darken-4">Todos los campos son obligatorios</p>}
           <div className="input-field col s12">
               <input 
                    type="text" 
                    name="ciudad" 
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad</label>
           </div>
           <div className="input-field col s12">
                <select 
                    name="pais" 
                    id="pais"
                    value={pais}
                    onChange={handleChange}>
                    <option value="">-- Selecciona un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <div className="input-field cols12">
                    <input 
                        type="submit" 
                        value="Buscar clima"
                        className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    />
                </div>
           </div>
        </form>
    );
};

export default Formulario;