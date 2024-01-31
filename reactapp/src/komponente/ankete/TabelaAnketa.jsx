import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RedAnkete from '../reusable/RedAnkete';
import InputField from '../reusable/InputField';
import Modal from 'react-modal';
const TabelaAnketa = () => {
    let navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    naslov: 'novaanketa',
    opis: 'opis nove ankete',
    datum_pocetka: '2024-01-01',
    datum_kraja: '2025-01-04',
    status: 'otvoreno'
  });
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ankete');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };
  
    fetchSurveys();
  }, [isModalOpen]);


  const handleInputChange = (e) => {
    setNewSurvey(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ankete', newSurvey, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsModalOpen(false);
     
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };
  return (
    <div style={styles.container}>
       <button onClick={() => setIsModalOpen(true)}>Dodaj Novu Anketu</button>
       <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} style={modalStyles.form}>
          <input
            type="text"
            name="naslov"
            placeholder="Naslov"
            value={newSurvey.naslov}
            onChange={handleInputChange}
            style={modalStyles.input}
          />
          <input
            type="text"
            name="opis"
            placeholder="Opis"
            value={newSurvey.opis}
            onChange={handleInputChange}
            style={modalStyles.input}
          />
          <input
            type="date"
            name="datum_pocetka"
            placeholder="Datum početka"
            value={newSurvey.datum_pocetka}
            onChange={handleInputChange}
            style={modalStyles.input}
          />
          <input
            type="date"
            name="datum_kraja"
            placeholder="Datum kraja"
            value={newSurvey.datum_kraja}
            onChange={handleInputChange}
            style={modalStyles.input}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={newSurvey.status}
            onChange={handleInputChange}
            style={modalStyles.input}
          />
          <button type="submit" style={modalStyles.submitButton}>Kreiraj Anketu</button>
        </form>
      </Modal>


      <div style={styles.tableContainer}>
        <table style={styles.table}>
        <thead>
        <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Start Date</th>
            <th style={styles.th}>End Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Detalji</th>
        </tr>
        </thead>
        <tbody>
        {surveys.map(survey => (
              <RedAnkete key={survey.id} survey={survey} navigate={navigate} />
            ))}
        </tbody>

        </table>
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
    background: 'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',  
  },
  th: {
    padding: '15px 10px', 
    borderBottom: '1px solid #ddd',  
    textAlign: 'left', 
    backgroundColor: '#dae2df', 
    color: '#6d696a',  
  },
  td: {
    padding: '20px 10px',  
    borderBottom: '1px solid #ddd', 
  },
  openStatus: {
    color: '#98FB98', 
  },
  closedStatus: {
    color: '#FFB6C1',  
  },
 
};
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '50%', 
    border: '1px solid #ddd',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#dae2df',
    color: '#6d696a',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  }
};
export default TabelaAnketa;
