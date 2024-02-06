import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealManager from './SavedMeals/MealslManager';
import FetchMeals from './FetchedMeals/FetchMeals';
import Login from './Authentication/Login'; 
import Register from './Authentication/Register'; 
import ProtectedRoute from '../utils/ProtectedRoute';
import Navbar from './Navbar';
import { AuthProvider } from '../utils/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<FetchMeals/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/meals" element={<MealManager />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
