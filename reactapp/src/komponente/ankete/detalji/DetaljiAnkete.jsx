import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetaljiAnkete = () => {
  const { id } = useParams();
  const [anketa, setAnketa] = useState(null);

  useEffect(() => {
    const fetchAnketa = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ankete/${id}/pitanjaodgovori`);
        setAnketa(response.data);
      } catch (error) {
        console.error('Error fetching anketa:', error);
      }
    };

    fetchAnketa();
  }, [id]);

  if (!anketa) {
    return <div>Loading...</div>;
  }

  const generateChartData = (pitanje) => {
    const odgovorCount = {};

    pitanje.odgovori.forEach((odgovor) => {
      if (odgovorCount[odgovor.odgovor]) {
        odgovorCount[odgovor.odgovor]++;
      } else {
        odgovorCount[odgovor.odgovor] = 1;
      }
    });

    const labels = Object.keys(odgovorCount);
    const data = Object.values(odgovorCount);

    return {
      labels,
      datasets: [
        {
          label: 'Broj Odgovora',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={styles.container}>
      <div style={styles.detailsContainer}>
        <h2>{anketa.naslov}</h2>
        <p>{anketa.opis}</p>
        <p>Start Date: {anketa.datum_pocetka}</p>
        <p>End Date: {anketa.datum_kraja}</p>
        <p>Status: {anketa.status}</p>
        <h3>Pitanja:</h3>
        <ul>
          {anketa.pitanja.map((pitanje) => (
            <div key={pitanje.id}>
              <li>{pitanje.tekst}</li>
              <Bar data={generateChartData(pitanje)} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background:
      'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default DetaljiAnkete;
