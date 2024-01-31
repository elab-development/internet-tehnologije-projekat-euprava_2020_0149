import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({token,setToken}) => {
  const [userRole, setUserRole] = useState(null);
   

  useEffect(() => {
   
    if (token) {
      const userRoleFromStorage = sessionStorage.getItem('user_uloga');
      setUserRole(userRoleFromStorage);
    }
  }, [token]);

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
    backgroundColor:'rgb(226, 218, 219)'  ,
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
