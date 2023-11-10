import { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ match }) => {
  const [contrasena, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`/api/auth/reset-password/${match.params.token}`, {
        contrasena,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage('Error resetting password');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input type="password" id="password" value={contrasena} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;