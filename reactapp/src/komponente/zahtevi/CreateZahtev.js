import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateZahtev = () => {
  const [tipZahteva, setTipZahteva] = useState('Obnova lične karte');
  const [opis, setOpis] = useState('Molim za obnovu lične karte jer je istekla.');
  const [datumPodnosenja, setDatumPodnosenja] = useState(new Date().toISOString().split('T')[0]);
  const [zahtevi, setZahtevi] = useState([]);

  useEffect(() => {
    const fetchZahtevi = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/zahtevi', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setZahtevi(response.data);
      } catch (error) {
        console.error('Failed to fetch zahtevi:', error);
      }
    };

    fetchZahtevi();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token');
    const zahtevData = {
      tip_zahteva: tipZahteva,
      opis,
      datum_podnosenja: datumPodnosenja,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/zahtevi', zahtevData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Zahtev uspešno kreiran');
      // Reload zahtevi
      const response = await axios.get('http://127.0.0.1:8000/api/zahtevi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZahtevi(response.data);
    } catch (error) {
      console.error('Failed to create zahtev:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Kreiranje Zahteva</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Tip Zahteva"
          value={tipZahteva}
          onChange={(e) => setTipZahteva(e.target.value)}
        />
        <textarea
          style={styles.input}
          placeholder="Opis"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
        />
        <input
          style={styles.input}
          type="date"
          value={datumPodnosenja}
          onChange={(e) => setDatumPodnosenja(e.target.value)}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      <h2>Moji Zahtevi</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tip Zahteva</th>
            <th>Opis</th>
            <th>Status</th>
            <th>Datum Podnošenja</th>
            <th>Odgovor</th>
          </tr>
        </thead>
        <tbody>
          {zahtevi.map((zahtev) => (
            <tr key={zahtev.id}>
              <td>{zahtev.tip_zahteva}</td>
              <td>{zahtev.opis}</td>
              <td>{zahtev.status}</td>
              <td>{zahtev.datum_podnosenja}</td>
              <td>{zahtev.odgovor || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#a2a7a5',
    color: 'white',
    cursor: 'pointer',
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default CreateZahtev;
