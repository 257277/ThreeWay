
import './App.css';
import AllRoute from './allRoutes/allRoute';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <AllRoute />
      </Router>
    </div>
  );
}

export default App;
