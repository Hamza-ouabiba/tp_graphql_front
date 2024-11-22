import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div style={styles.navContainer}>
      <h1 style={styles.logo}>Bank App</h1>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/transactions" style={styles.link}>créer transaction</Link>
        <Link to="/" style={styles.link}>Comptes</Link>
      </div>
    </div>
  );
};

const styles = {
  navContainer: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  }
};

export default Navigation;
