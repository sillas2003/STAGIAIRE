import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Add() {
    const [inputData, setInputData] = useState({ amount: '', date: '', description: '', Utilisateur: '', Category: '' });
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer la liste des catégories depuis votre API
        axios.get('http://127.0.0.1:8000/api/Category/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error(error));

        // Récupérer la liste des utilisateurs depuis votre API
        axios.get('http://127.0.0.1:8000/api/user/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/Expense/', inputData)
            .then(res => {
                alert("Données ajoutées avec succès");
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex w-100 h-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="amount" className="form-label">Montant</label>
                        <input type="number" name='amount' className="form-control"
                            onChange={e => setInputData({ ...inputData, amount: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" name='date' className="form-control"
                            onChange={e => setInputData({ ...inputData, date: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" name='description' className="form-control"
                            onChange={e => setInputData({ ...inputData, description: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="Utilisateur" className="form-label">Utilisateur</label>
                        <select name="Utilisateur" className="form-select"
                            onChange={e => setInputData({ ...inputData, Utilisateur: e.target.value })}>
                            <option value="">Sélectionnez un utilisateur</option>
                            {users.map(user => (
                                <option key={user.id} value={user.username}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Category" className="form-label">Catégorie</label>
                        <select name="Category" className="form-select"
                            onChange={e => setInputData({ ...inputData, Category: e.target.value })}>
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-info">Ajouter</button>
                </form>
            </div>
        </div>
    )
}

export default Add;
