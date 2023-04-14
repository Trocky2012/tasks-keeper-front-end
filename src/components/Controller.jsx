import "bootstrap/dist/css/bootstrap.min.css"
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { HashRouter } from "react-router-dom";
//import Auth from "./Auth"
import App from "./App"

function Controller() {
  return (
    <>
    <Router history={HashRouter}>
        <Routes>
            {/* <Route path="/" element={<Auth />} /> */}
            <Route path="/" element={<App />} />
            <Route path="*" element={<Navigate to="/" replace />}
            />
        </Routes>
    </Router>
    </>
  );
}

export default (Controller)
