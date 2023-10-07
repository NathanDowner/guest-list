import { Provider } from 'react-redux';
import { store } from './store/store';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <>
      <Provider store={store}>
        <MainComponent />
      </Provider>
    </>
  );
}

export default App;
