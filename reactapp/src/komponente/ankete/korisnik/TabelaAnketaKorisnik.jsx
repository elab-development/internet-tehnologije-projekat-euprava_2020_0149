 
import { useNavigate, Link } from 'react-router-dom';
import useSurveys from '../../useSurveys';

const TabelaAnketaKorisnik = () => {
  
  const { surveys, setSurveys } = useSurveys(); 

  return (
    <div style={styles.container}>
      <h2>Surveys</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th> 
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map(survey => (
            <tr key={survey.id}>
              <td style={styles.td}>{survey.id}</td>
              <td style={styles.td}>{survey.naslov}</td>
              <td style={styles.td}>{survey.opis}</td> 
              <td style={styles.td}>{survey.status}</td>
              <td style={styles.td}>
                <Link to={`/ankete/glasaj/${survey.id}`}>Glasaj</Link>
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
    justifyContent: 'flex-start',
    height: 'auto',
    background: 'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
    padding: '20px 0'
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    marginTop: '20px',
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
};

export default TabelaAnketaKorisnik;
