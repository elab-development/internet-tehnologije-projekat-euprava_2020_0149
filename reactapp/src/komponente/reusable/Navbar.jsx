import React, { useEffect, useState } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ token, setToken }) => {
  const [userRole, setUserRole] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    if (token) {
      const userRoleFromStorage = sessionStorage.getItem('user_uloga');
      setUserRole(userRoleFromStorage);
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      if (!token) { 
        return;
      }
 
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      
      const response = await axios.post('http://127.0.0.1:8000/api/logout', null, { headers });

      if (response.status === 200) {
       
        sessionStorage.clear();
        setToken(null);

        
        history('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.controlsContainer}>
        <Link to="/">Home</Link>
        {token && userRole === 'korisnik' && (
          <>
            <Link to="/ankete">Ankete</Link>
          </>
        )}
        {token && userRole === 'admin' && (
          <>
            <Link to="/admin">Admin</Link>
          </>
        )}
        <Link to="/fda">FDA</Link>
        {token && (
          <button onClick={handleLogout}>Logout</button>
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
    backgroundColor: 'rgb(226, 218, 219)',
    padding: '20px 0'
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: '20px',
  },
};

export default Navbar;
