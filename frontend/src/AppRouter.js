import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Add from "./Add";
import Edit from "./Edit";
import  App from  "./App";
import  Login from "./Login"

import Register from "./register";

function AppRouter() {
    return (
        <BrowserRouter>

               <Routes>
                   <Route path='/' element={<Login/>}/>
                   <Route path='/App' element={<App/>}/>
                   <Route path='/create' element={<Add />}/>
                   <Route path='/update/:id/' element={<Edit/>} />
                   <Route path='/register'   element={<Register/>}/>
                   
               </Routes>
        </BrowserRouter>
    )
}
export default AppRouter