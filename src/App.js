// Routing

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar'; 
import MealTracker from './MealTracker';
import DailySummary from './DailySummary';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/meals" element={<MealTracker />} />
          <Route path="/summary" element={<DailySummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
