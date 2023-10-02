
import axios from "axios";
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link , useNavigate} from "react-router-dom"
import "./App.css";
function App() {
  const [columns, setColumns] = useState([])
  const [records, setRecords] = useState([])
  const navigate = useNavigate
  useEffect(() => {
       axios.get('http://127.0.0.1:8000/api/Expense/')
     
       .then(res =>{
         setColumns(Object.keys(res.data[0]))
         setRecords( res.data)

       })
  
  }, [])
  return (
    <div className="container mt-5">
      <div className="text-end"><Link to="/create" className="btn btn-warning">Add+</Link></div>
      <table className="table">
        <thead>
          {columns.map((c, i) => (
            <th key={i}>{c}</th>
          ))}
          <th>Action</th>

        </thead>
        <tbody>
          {
            records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}#</td>
                <td>{d.Utilisateur_nom}</td>
                <td>{d.amount}</td>                                               
                <td>{d.date}</td>
                <td>{d.description}</td>
                <td>{d.Category_nom}</td>
                
                <td>
                  <Link  to={`/update/${d.id}`} className="btn btn-sm btn-lime">Update</Link>
                  
                  <button  onClick={e=> handleSubmit(d.id)}   className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
      
    </div>
  );
  function handleSubmit(id){
   const conf = window.confirm ("Do you want to delete");
   if (conf) {
      axios.delete('http://127.0.0.1:8000/api/Expense/'+id)
      .then(res =>{
        alert('record has deleted');
        navigate('/')
      }).catch(err => console.log(err))
   }
  }
}

export default App;
