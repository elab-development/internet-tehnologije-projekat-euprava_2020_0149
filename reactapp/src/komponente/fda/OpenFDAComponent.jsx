import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenFDAComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await axios.get('https://api.fda.gov/food/enforcement.json?limit=5');
        setData(result.data.results);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <h2>OpenFDA Food Recall Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            
            <p>Proizvod: {item.product_description}</p>
            <p>Razlog opoziva: {item.reason_for_recall}</p>
            <p>Datum objave: {item.report_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',  
      height: 'auto',
      background: 'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
      padding: '20px 0'
    }
};
export default OpenFDAComponent;
