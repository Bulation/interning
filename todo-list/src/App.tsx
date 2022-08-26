import { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [searchValue, setSearchValue] = useState(''); //создаю стейт для поиска тудушек по имени
  return (
    <div className="App">
      <Header 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Main 
        searchValue={searchValue}
      />
    </div>
  );
}

export default App;
