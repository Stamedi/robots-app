import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
// import { useEffect, useState } from 'react';
// import data from './data/data-v2.json';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
