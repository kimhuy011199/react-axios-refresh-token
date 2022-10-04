import React from 'react';
import Status from './components/Status';
import Login from './components/Login';
import Protected from './components/Protected';
import Guide from './components/Guide';

const App = () => {
  return (
    <div className="mx-auto max-w-3xl antialiased mt-20 grid grid-cols-2 gap-10">
      <div>
        <Status />
        <Login />
        <Protected />
      </div>
      <Guide />
    </div>
  );
};

export default App;
