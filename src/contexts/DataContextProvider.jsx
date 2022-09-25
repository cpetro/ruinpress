import React, { createContext, useState, useEffect } from "react";

import Papa from 'papaparse';

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVTHz5EiCM1TIBUvHuHFXKYG-2MFWtq3Qcvnc35wB3nGBgn35XTfb6i4ByorPAqOJMVQdJZKl-_Uv8/pub?output=csv';

const DataContext = createContext();

const DataContextProvider = ({ children }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      }
    });
  }, []);

  return (
    <DataContext.Provider value={ data }>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };

