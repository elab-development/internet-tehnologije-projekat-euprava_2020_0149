import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../reusable/InputField';

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    imePrezime: 'Test User',
    email: 'testuser234@example.com',
    password: 'password',
    confirmPassword: 'password',
    datum_rodjenja: '1990-01-01',
    pol: 'muški',
    adresa: 'Test Address',
    grad: 'Test City',
    drzava: 'Test Country',
    telefon: '1234567890',
    JMBG: '1231111890123',
    broj_licne_karte: 'A1211456',
    status: 'aktivan',
    role: 'korisnik',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      navigate('/');
    } catch (error) {
      alert('Registration failed:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Please Register</h2>
        <InputField
          type="text"
          placeholder="Name"
          name="imePrezime"
          value={formData.imePrezime}
          onChange={handleChange}
        />
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <InputField
          type="date"
          placeholder="Datum Rođenja"
          name="datum_rodjenja"
          value={formData.datum_rodjenja}
          onChange={handleChange}
        />
        <div style={styles.input}>
          <label htmlFor="pol">Pol</label>
          <select
            name="pol"
            value={formData.pol}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="muški">Muški</option>
            <option value="ženski">Ženski</option>
            <option value="drugo">Drugo</option>
          </select>
        </div>
        <InputField
          type="text"
          placeholder="Adresa"
          name="adresa"
          value={formData.adresa}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Grad"
          name="grad"
          value={formData.grad}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Država"
          name="drzava"
          value={formData.drzava}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Telefon"
          name="telefon"
          value={formData.telefon}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="JMBG"
          name="JMBG"
          value={formData.JMBG}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Broj Lične Karte"
          name="broj_licne_karte"
          value={formData.broj_licne_karte}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  select: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#a2a7a5',
    color: 'white',
    cursor: 'pointer',
  }
};

export default Register;
