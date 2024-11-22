import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_TRANSACTION_STATS = gql`
query {
  transactionStats {
    count
    sumDepots
    sumRetraits
  }
}
`;
const Dashboard = () => {

  const { loading, error, data } = useQuery(GET_TRANSACTION_STATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const { count, sumDepots, sumRetraits } = data.transactionStats;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}></h2>
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Transactions</h3>
          <p style={styles.cardValue}>{count}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Depots</h3>
          <p style={styles.cardValue}>DH {sumDepots.toFixed(2)}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Retraits</h3>
          <p style={styles.cardValue}>DH {sumRetraits.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#007bff',
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default Dashboard;
