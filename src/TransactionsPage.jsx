import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_COMPTE_TRANSACTIONS = gql`
  query GetCompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      montant
      type
      date
    }
  }
`;

const TransactionsPage = () => {
  const { compteId } = useParams();

  const { loading, error, data } = useQuery(GET_COMPTE_TRANSACTIONS, {
    variables: { id: compteId },
  });

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const transactions = data.compteTransactions;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        Transactions pour le compte ID: {compteId}
      </h2>
      {transactions.length === 0 ? (
        <p>Aucune transaction trouvée pour ce compte.</p>
      ) : (
        <div style={styles.cardContainer}>
          {transactions.map((transaction) => (
            <div key={transaction.id} style={styles.card}>
              <h3 style={styles.cardHeader}>
                Transaction ID: {transaction.id}
              </h3>
              <p style={styles.cardText}>
                <strong>Montant:</strong> ${transaction.montant.toFixed(2)}
              </p>
              <p style={styles.cardText}>
                <strong>Type:</strong> {transaction.type}
              </p>
              <p style={styles.cardText}>
                <strong>Date:</strong> {transaction.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  cardHeader: {
    fontSize: '1.2rem',
    color: '#007bff',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '1rem',
    margin: '5px 0',
    color: '#555',
  },
};

export default TransactionsPage;
