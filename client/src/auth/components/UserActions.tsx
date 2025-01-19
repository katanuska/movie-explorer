import { useState } from 'react';
import './UserActions.css';
import { useUser } from '../UserContext';
import Modal from '../../components/Modal';
import SignUp from './SignUp';
import SignIn from './SignIn';

const UserActions = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<'signUp' | 'signIn' | null>(null);

  const { user } = useUser();

  const handleOpenSignUp = () => {
    setModalOpen(true);
    setAction('signUp');
  };

  const handleOpenSignIn = () => {
    setModalOpen(true);
    setAction('signIn');
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setAction(null);
  };

  return (
    <div className="user-button">
      {user ? (
        <>
          <div className="user-button">Welcome {user?.username}!</div>
        </>
      ) : (
        <button className="light" onClick={handleOpenSignIn}>
          Sign in
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {action === 'signIn' && (
          <SignIn onSuccess={handleModalClose} onSignUp={handleOpenSignUp} />
        )}
        {action === 'signUp' && <SignUp onSignIn={handleOpenSignIn} />}
      </Modal>
    </div>
  );
};

export default UserActions;
