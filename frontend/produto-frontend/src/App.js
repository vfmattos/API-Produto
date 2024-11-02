// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Produto from './pages/Produto';
import Login from './pages/Login';
import { Button } from 'antd';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <div className="App">

{token ? (
        <>
          <Button onClick={logout}>Logout</Button>
          <Produto token={token} />
        </>
      ) : (
        <Login setToken={saveToken} />
      )}
      
    </div>
  );
}

export default App;
