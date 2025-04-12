import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Casa from './paginas/Casa';
import Inicio from './paginas/Inicio';
import Register from './paginas/Register';
import Edit from './paginas/Edit';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <div style={styles.logo}>SYSTEM</div>
        <ul style={styles.ul}>
          {user && (
            <li style={styles.li}>
              <Link to="/" style={styles.link}>
                <span style={styles.icon}>⌂</span> INICIO
              </Link>
            </li>
          )}
          {!user && (
            <>
              <li style={styles.li}>
                <Link to="/login" style={styles.link}>
                  <span style={styles.icon}>⏣</span> ACCESO
                </Link>
              </li>
              <li style={styles.li}>
                <Link to="/registro" style={styles.link}>
                  <span style={styles.icon}>⊕</span> REGISTRO
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li style={styles.li}>
                <button onClick={handleLogout} style={styles.button}>
                  <span style={styles.icon}>⏻</span> SALIR
                </button>
              </li>
              <li style={styles.userBadge}>
                <span style={styles.userIcon}>👤</span>
                <span style={styles.userName}>{user?.nombre}</span>
              </li>
            </>
          )}
        </ul>
      </div>
      <div style={styles.navGlow}></div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Casa />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Inicio />} />
          <Route path="/editar/:id" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: 'rgba(10, 10, 20, 0.8)',
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
    boxShadow: '0 5px 30px rgba(0, 0, 0, 0.3)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#00f0ff',
    fontWeight: 'bold',
    fontSize: '20px',
    letterSpacing: '3px',
    textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  li: {
    position: 'relative',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    padding: '10px 15px',
    borderRadius: '6px',
    ':hover': {
      color: '#00f0ff',
      backgroundColor: 'rgba(0, 240, 255, 0.1)',
    },
  },
  button: {
    background: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    padding: '10px 15px',
    borderRadius: '6px',
    ':hover': {
      color: '#ff3366',
      backgroundColor: 'rgba(255, 51, 102, 0.1)',
    },
  },
  icon: {
    fontSize: '16px',
    color: '#00f0ff',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: '20px',
    padding: '8px 15px',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(0, 240, 255, 0.3)',
  },
  userIcon: {
    fontSize: '14px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#00f0ff',
  },
  navGlow: {
    position: 'absolute',
    bottom: '-5px',
    left: 0,
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
    boxShadow: '0 0 10px #00f0ff',
  },
  content: {
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '0 20px',
  },
};

export default App;