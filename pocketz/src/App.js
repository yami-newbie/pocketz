import React from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import CreateAccountForm from './components/CreateAccountForm'

function App() {

  const [users, setUser] = useLocalStorage("users", []);
  
  return (
    <div className="App">
      <CreateAccountForm/>
      <ul>
        {users.map((doc) => {
          return (
            <li key={doc.key}>
              Username: {doc.username} <br/>
              Address: {doc.account.address} <br />
              PrivateKey: {doc.account.privateKey}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
