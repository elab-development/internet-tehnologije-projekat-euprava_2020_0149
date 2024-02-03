import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const GlasajAnketa = () => {
  const { id } = useParams();
  const [anketa, setAnketa] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userRatings, setUserRatings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchAnketa = async () => {
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ankete/${id}/pitanjaodgovori`);
        setAnketa(response.data);
      } catch (error) {
        
      }
      
    };

    fetchAnketa();
  }, [id]);
  const handleRatingClick = async (rating) => {
    const korisnikId = sessionStorage.getItem('user_id');  
    const odgovor = {
      anketa_id: id,
      korisnik_id: korisnikId,
      pitanje_ankete_id: anketa.pitanja[currentQuestionIndex].id+"",
      odgovor: rating+"",
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/odgovori', odgovor);
      console.log(response.data);  
    } catch (error) {
      console.error('Error submitting answer:', error);
    }

    // Pređi na sledeće pitanje ili završi anketu
    if (currentQuestionIndex + 1 < anketa.pitanja.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        alert('Hvala što ste odgovorili na sva pitanja!');
        navigate('/ankete');
    }
  };
 
  if (!anketa) {
    return <div>Loading...</div>;
  }

  if (submitted) {
    return <div>Answers submitted successfully!</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.detailsContainer}>
        <h2>{anketa.naslov}</h2>
        <p>{anketa.opis}</p>
        <p>Start Date: {anketa.datum_pocetka}</p>
        <p>End Date: {anketa.datum_kraja}</p>
        <p>Status: {anketa.status}</p>
        <h3>Pitanje {currentQuestionIndex + 1}:</h3>
        <ul>
          <li>{anketa.pitanja[currentQuestionIndex].tekst}</li>
          <div style={styles.ratingButtons}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={userRatings[currentQuestionIndex] === rating ? 'selected' : ''}
              >
                {rating}
              </button>
            ))}
          </div>
        </ul>
        {currentQuestionIndex === anketa.pitanja.length - 1 && (
            <p>Hvala!</p>

        )}
      </div>
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
    padding: '20px 0',
  },
  detailsContainer: {
    width: '80%',
  },
  ratingButtons: {
    display: 'flex',
    gap: '5px',
  },
};

export default GlasajAnketa;
