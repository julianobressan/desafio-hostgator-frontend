import React from 'react';
import Header from './components/Header';
import './styles/style.css';
import Main from './pages/main';
import Banner from './components/Banner';

const App = () => (
  <div className="App">
    <Header />
    <Banner />
    <Main />
  </div>
);

export default App;
