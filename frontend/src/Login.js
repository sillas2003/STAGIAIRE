import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api2/login/', {
        username: username,
        password: password,
      });

      // Stockez le token dans localStorage après la connexion réussie
      localStorage.setItem('token', response.data.token);

      // Redirigez l'utilisateur vers la page principale après la connexion
      navigate('/App');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Connexion</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nom d'utilisateur"
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
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Connexion</button>
              </form>
              <p className="mt-3">
               Vous n'avez pas de compte ?{' '}
               <Link to="/register">Inscrivez-vous ici</Link>
             </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login