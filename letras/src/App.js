import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import Spinner from "./components/Spinner";
import { primeraMayuscula } from './helper'
import axios from "axios";
import translate from "translate";
translate.engine = "google";
translate.key = "AIzaSyB6KnDssQ37J1KZ8XMdcP4IImun6tXTwjY";

function App() {
  const [busquedaletra, guardarBusquedaletra] = useState({});
  const [letra, guardarLetra] = useState({});
  const [info, guardarInfo] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      guardarCargando(true)
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${primeraMayuscula(cancion)}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);
      const traducida = await translate(letra.data.lyrics, "es");
      guardarLetra({
        letra: letra.data.lyrics,
        traducida
      });
      guardarInfo(informacion.data.artists[0]);
      
      guardarCargando(false);
    };

    consultarApiLetra();
  }, [busquedaletra]);

  return (
    <>
      <Formulario
        guardarBusquedaletra={guardarBusquedaletra}
      />
      <div className="container mt-5">
        {cargando ? (
          <Spinner />
        ) : (
          <div className="row">
            <div className="col-md-7">
              <Cancion letra={letra} />
            </div>
            <div className="col-md-5">
              <Info info={info} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
