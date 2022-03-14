import React from 'react'
import account from './account';

function App() {
  return (
    <div className="App">
      <button onClick={()=>{
        const acc = account.create();
        console.log(acc);
      }}>Create</button>
    </div>
  );
}

export default App;
