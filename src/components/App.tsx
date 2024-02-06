import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealManager from './SavedMeals/MealslManager'
import Login from './Authentication/Login'; 
import Register from './Authentication/Register'; 
import ProtectedRoute from '../utils/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MealManager />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
