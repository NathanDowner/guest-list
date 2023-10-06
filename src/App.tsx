import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import GuestList from './components/GuestList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <div className="p-4">
          <header>
            <h1 className="text-4xl text-center">Guest list</h1>
          </header>
          {/* Container */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <GuestList name="Brit Brit" />
            <GuestList />
            <GuestList name="Nathan" />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
