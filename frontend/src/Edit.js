import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        amount: '',
        date: '',
        description: '',
        Utilisateur: '',
        Category: '',
    });
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Récupérer les données de l'élément à mettre à jour
        axios.get(`http://127.0.0.1:8000/api/Expense/${id}/`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));

        // Récupérer la liste des utilisateurs depuis votre API
        axios.get('http://127.0.0.1:8000/api/user/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(error));

        // Récupérer la liste des catégories depuis votre API
        axios.get('http://127.0.0.1:8000/api/Category/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error(error));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/Expense/${id}/`, data)
            .then(res => {
                alert("Données mises à jour avec succès");
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
                        <input type="number" name='amount' value={data.amount} className="form-control"
                            onChange={e => setData({ ...data, amount: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" name='date' value={data.date} className="form-control"
                            onChange={e => setData({ ...data, date: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" name='description' value={data.description} className="form-control"
                            onChange={e => setData({ ...data, description: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="Utilisateur" className="form-label">Utilisateur</label>
                        <select name="Utilisateur" className="form-select"
                            value={data.Utilisateur}
                            onChange={e => setData({ ...data, Utilisateur: e.target.value })}>
                            <option value="">Sélectionnez un utilisateur</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Category" className="form-label">Catégorie</label>
                        <select name="Category" className="form-select"
                            value={data.Category}
                            onChange={e => setData({ ...data, Category: e.target.value })}>
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-info">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
