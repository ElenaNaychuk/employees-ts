import React from 'react';
import {Route, Routes} from "react-router-dom";
import {EmployeeSearchPage} from "./pages/EmployeeSearchPage/EmployeeSearchPage";
import {HomePage} from "./pages/HomePage/HomePage";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import './styles/App.scss';

export const employeePath = "/employee";
export const homePath = "/";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={employeePath} element={<EmployeeSearchPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path={homePath} element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
