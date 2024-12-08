import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminZahtevi = () => {
  const [zahtevi, setZahtevi] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchZahtevi = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/adminZahtevi', {
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

  const handleEditChange = (id, field, value) => {
    setEditData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    const token = sessionStorage.getItem('token');
    const { status, odgovor } = editData[id] || {};
    try {
      await axios.patch(`http://127.0.0.1:8000/api/zahtevi/${id}`, { status, odgovor }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Zahtev uspešno izmenjen');
      // Update local state after save
      setZahtevi((prevState) =>
        prevState.map((zahtev) =>
          zahtev.id === id ? { ...zahtev, status, odgovor } : zahtev
        )
      );
    } catch (error) {
      console.error('Failed to update zahtev:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/zahtevi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Zahtev uspešno obrisan');
      // Update local state after delete
      setZahtevi((prevState) =>
        prevState.filter((zahtev) => zahtev.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete zahtev:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin - Uredi Zahteve</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tip Zahteva</th>
            <th>Opis</th>
            <th>Status</th>
            <th>Datum Podnošenja</th>
            <th>Odgovor</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {zahtevi.map((zahtev) => (
            <tr key={zahtev.id}>
              <td>{zahtev.id}</td>
              <td>{zahtev.tip_zahteva}</td>
              <td>{zahtev.opis}</td>
              <td>
                <select
                  value={editData[zahtev.id]?.status || zahtev.status}
                  onChange={(e) => handleEditChange(zahtev.id, 'status', e.target.value)}
                >
                  <option value="podnet">Podnet</option>
                  <option value="u obradi">U obradi</option>
                  <option value="završen">Završen</option>
                </select>
              </td> 
              <td>{zahtev.datum_podnosenja}</td> 
              <td>
                <input
                  type="text"
                  value={editData[zahtev.id]?.odgovor || zahtev.odgovor || ''}
                  onChange={(e) => handleEditChange(zahtev.id, 'odgovor', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(zahtev.id)} style={styles.button}>
                  Sačuvaj
                </button>
                <button onClick={() => handleDelete(zahtev.id)} style={{ ...styles.button, backgroundColor: '#ff4d4d' }}>
                  Obriši
                </button>
              </td>
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
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#a2a7a5',
    color: 'white',
    cursor: 'pointer',
    marginRight: '5px',
  },
};

export default AdminZahtevi;
