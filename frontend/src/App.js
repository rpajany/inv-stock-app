import { AllRoutes } from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={2000} closeOnClick />
      <AllRoutes />
    </div>
  );
}

export default App;
