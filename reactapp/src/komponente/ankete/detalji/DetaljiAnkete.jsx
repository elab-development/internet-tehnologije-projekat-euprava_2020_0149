import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetaljiAnkete = () => {
  const { id } = useParams();
  const [anketa, setAnketa] = useState(null);
  const chartRefs = useRef([]);

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
      //
      //odgovorCount{
        //"DA":16,
        //NE: 10,
        //NZM:7
      //}
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

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(12);
    pdf.text(`Izveštaj za anketu: ${anketa.naslov}`, 40, 40);
    pdf.text(`Opis: ${anketa.opis}`, 40, 60);
    pdf.text(`Datum pocetka: ${anketa.datum_pocetka}`, 40, 80);
    pdf.text(`Datum kraja: ${anketa.datum_kraja}`, 40, 100);
    pdf.text(`Status: ${anketa.status}`, 40, 120);

    let yOffset = 140;

    for (let i = 0; i < anketa.pitanja.length; i++) {
      const pitanje = anketa.pitanja[i];
      const chartCanvas = chartRefs.current[i];
      const canvas = await html2canvas(chartCanvas);
      const imgData = canvas.toDataURL('image/png');

      // Dodaj pitanje
      pdf.text(pitanje.tekst, 40, yOffset);
      yOffset += 20;

      // Proveri da li ima dovoljno prostora za grafikon, ako ne dodaj novu stranicu
      if (yOffset + 300 > pdf.internal.pageSize.height) {
        pdf.addPage();
        yOffset = 40;
      }

      pdf.addImage(imgData, 'PNG', 40, yOffset, 500, 300);
      yOffset += 320; // Prostor za sledeće pitanje i grafikon
    }

    pdf.save('anketa_izvestaj.pdf');
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
          {anketa.pitanja.map((pitanje, index) => (
            <div key={pitanje.id}>
              <li>{pitanje.tekst}</li>
              <div ref={(el) => (chartRefs.current[index] = el)}>
                <Bar data={generateChartData(pitanje)} />
              </div>
            </div>
          ))}
        </ul>
        <button onClick={generatePDF} style={styles.button}>Generate PDF</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft:"20%",
    marginRight:"20%",

    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DetaljiAnkete;
