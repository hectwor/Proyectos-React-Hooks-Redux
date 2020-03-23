import React from "react";

const Cancion = ({ letra }) => {
  if (Object.keys(letra).length === 0) return null;
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h2>Letra Canción</h2>
          <p className="letra">{letra.letra=== ""? "No se encontró letra de esa canción, intente ingresarla incorrectamente":letra.letra}</p>
        </div>
        <div className="col-md-6">
          <h2>Letra Traducida</h2>
          <p className="letra">{letra.traducida}</p>
        </div>
      </div>
    </>
  );
};

export default Cancion;
