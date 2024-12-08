import React from 'react';

const RedAnkete = ({ survey, navigate }) => {
  return (
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
        <button onClick={() => navigate(`/ankete/${survey.id}`)}>Detalji</button>
      </td>
    </tr>
  );
};

const styles = {
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

export default RedAnkete;
