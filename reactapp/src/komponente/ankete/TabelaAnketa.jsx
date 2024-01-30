import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TabelaAnketa = () => {
    let navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);

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
  }, []);

  return (
    <div style={styles.container}>
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
            <tr key={survey.id}>
            <td style={styles.td}>{survey.id}</td>
            <td style={styles.td}>{survey.naslov}</td>
            <td style={styles.td}>{survey.opis}</td>
            <td style={styles.td}>{survey.datum_pocetka}</td>
            <td style={styles.td}>{survey.datum_kraja}</td>
            <td style={styles.td}>
                <span style={survey.status.toLowerCase() === 'otvoreno' ? styles.openStatus : styles.closedStatus}>
                {survey.status}
                </span>
            </td>
            <td style={styles.td}>
                    <button onClick={() => navigate(`/anketa/${survey.id}`)}>Detalji</button>
                </td>
            </tr>
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

export default TabelaAnketa;
