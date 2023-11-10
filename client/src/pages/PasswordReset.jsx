import { useState } from 'react';
import { sendPasswordResetEmailRequest } from '../api/auth';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmailRequest(email);
      setMessage('Password reset email sent');
    } catch (error) {
      console.log(error);
      setMessage('Error sending email');
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Send Password Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;