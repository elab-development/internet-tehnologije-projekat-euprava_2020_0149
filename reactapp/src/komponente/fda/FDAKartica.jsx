import React from 'react';

const FDAKartica = ({ proizvod, razlogOpoziva, datumObjave,product_description }) => {
  return (
    <div style={styles.kartica}>
      <h3>Proizvod: {proizvod} </h3> 
      
      <p>Razlog opoziva: {razlogOpoziva}</p>
      <p>Datum objave: {datumObjave}</p>
      <p>Opis: {product_description}</p>
    </div>
  );
};

const styles = {
  kartica: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '30px',
    marginBottom: '10px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default FDAKartica;
