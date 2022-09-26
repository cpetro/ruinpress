import React, { useContext } from 'react';

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = {
  clientId: 'AQacwHFoxXwz1IuIG4g5rG6xFtLxJmwFjf3OhyT_HheCCxfnFxnlm7VccmXzFD3MNVJqb_xY6LDnaIUJ'
}

import { DataContext, DataContextProvider } from '././contexts/DataContextProvider';

import { Header, Home, PageDetail } from '~/components';

function App() {
  return(
    <PayPalScriptProvider options= {{"client-id": PAYPAL_CLIENT_ID.clientId }}>
      <DataContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<PageDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </DataContextProvider>
    </PayPalScriptProvider>
  ) 
}

export default App;
