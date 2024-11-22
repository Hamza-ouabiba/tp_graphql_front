import { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ALL_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id) {
      id
    }
  }
`;

const ComptesList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);
  const [deleteCompte] = useMutation(DELETE_COMPTE);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompte, setSelectedCompte] = useState(null);

  const openModal = (compte) => {
    setSelectedCompte(compte);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCompte(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCompte({ variables: { id: selectedCompte.id } });
      refetch(); // Refresh the data
      closeModal();
    } catch (err) {
      console.error("Error deleting compte:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Comptes List</h2>
      <div style={styles.grid}>
        {data.allComptes.map((compte) => (
          <div key={compte.id} style={styles.card}>
            <h3 style={styles.cardHeading}>Compte ID: {compte.id}</h3>
            <p><strong>Solde:</strong>{compte.solde.toFixed(2)} DH</p>
            <p><strong>Date:</strong> {new Date(compte.dateCreation).toLocaleDateString()}</p>
            <p><strong>Type:</strong> {compte.type}</p>
            <div style={styles.buttonContainer}>
              <Link to={`/transactions/${compte.id}`} style={styles.viewButton}>
                Voir Transactions
              </Link>
              <button
                style={styles.deleteButton}
                onClick={() => openModal(compte)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Confirmation</h3>
            <p>Êtes-vous sûr de vouloir supprimer le compte ID: {selectedCompte.id} ?</p>
            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={closeModal}>
                Annuler
              </button>
              <button style={styles.confirmButton} onClick={handleDelete}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  cardHeading: {
    fontSize: '1.5rem',
    color: '#007bff',
    marginBottom: '10px',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  viewButton: {
    marginTop: '10px',
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  modalActions: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  confirmButton: {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ComptesList;
