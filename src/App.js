import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Animal from './Animal';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Animal />
      </div>
    </Provider>
  );
}

export default App;
