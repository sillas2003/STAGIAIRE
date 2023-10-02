import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
        username: username,
        password: password,
      });

      // Stockez le token dans localStorage après l'inscription réussie
      localStorage.setItem('token', response.data.token);

      // Redirigez l'utilisateur vers la page principale après l'inscription
      navigate('/');
    } catch (error) {
      console.error('Erreur d\'enregistrement:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Page d'inscription</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
      <Link to="/login" className="mt-3">Déjà un compte ? Se connecter</Link>
    </div>
  );
}

export default Register;
