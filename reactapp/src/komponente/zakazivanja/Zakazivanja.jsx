import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Zakazivanja = () => {
  // Inicijalni test podaci
  const [datumVreme, setDatumVreme] = useState('2024-06-10T14:30');
  const [tipPregleda, setTipPregleda] = useState('Kontrolni pregled');
  const [status, setStatus] = useState('zakazano');
  const [napomena, setNapomena] = useState('Napomena za pregled');
  const [zakazivanja, setZakazivanja] = useState([]);

  useEffect(() => {
    const fetchZakazivanja = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/zakazivanja', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setZakazivanja(response.data);
      } catch (error) {
        console.error('Failed to fetch zakazivanja:', error);
      }
    };

    fetchZakazivanja();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token');
    const zakazivanjeData = {
      datum_vreme: datumVreme,
      tip_pregleda: tipPregleda,
      status,
      napomena,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/zakazivanja', zakazivanjeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Zakazivanje uspešno kreirano');
      setZakazivanja([...zakazivanja, response.data]); // Dodavanje novog zakazivanja u lokalno stanje
      setDatumVreme('2024-06-10T14:30'); // Resetovanje na inicijalne test podatke
      setTipPregleda('Kontrolni pregled');
      setStatus('zakazano');
      setNapomena('Napomena za pregled');
    } catch (error) {
      console.error('Failed to create zakazivanje:', error);
    }
  };

  const columns = [
    {
      name: 'Datum i Vreme',
      selector: row => row.datum_vreme,
      sortable: true,
    },
    {
      name: 'Tip Pregleda',
      selector: row => row.tip_pregleda,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Napomena',
      selector: row => row.napomena,
    },
  ];

  return (
    <div style={styles.container}>
      <h2>Kreiraj Zakazivanje</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="datetime-local"
          value={datumVreme}
          onChange={(e) => setDatumVreme(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Tip Pregleda"
          value={tipPregleda}
          onChange={(e) => setTipPregleda(e.target.value)}
          required
        />
        <select
          style={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled
        >
          <option value="zakazano">Zakazano</option>
          <option value="otkazano">Otkazano</option>
          <option value="završeno">Završeno</option>
        </select>
        <textarea
          style={styles.input}
          placeholder="Napomena"
          value={napomena}
          onChange={(e) => setNapomena(e.target.value)}
        />
        <button type="submit" style={styles.button}>Kreiraj</button>
      </form>
      <h2>Prethodna Zakazivanja</h2>
      <DataTable
        columns={columns}
        data={zakazivanja}
        pagination
        highlightOnHover
        striped
      />
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
};

export default Zakazivanja;
