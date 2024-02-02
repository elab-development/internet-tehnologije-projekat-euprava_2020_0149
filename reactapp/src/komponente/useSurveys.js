import { useState, useEffect } from 'react';
import axios from 'axios';

const useSurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ankete');
        setSurveys(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  return {surveys, setSurveys};
};

export default useSurveys;
