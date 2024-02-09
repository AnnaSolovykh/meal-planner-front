import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealManager from './SavedMeals/MealslManager';
import FetchMeals from './FetchedMeals/FetchMeals';
import Register from './Authentication/Register'; 
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import { AuthProvider } from './AuthProvider';
import LoginComponent from './Authentication/LoginComponent';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<FetchMeals/>} />
          <Route path="/login" element={<LoginComponent />} />
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
