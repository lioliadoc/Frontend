import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import ConditionListPage from './components/conditions/ConditionListPage';
import ConditionPage from './components/conditions/ConditionPage';
import StoriesPage from './components/stories/StoriesPage';
import LoginRedirect from './components/login/LoginRedirect'; 
import './index.css'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/conditions" element={<ConditionListPage />} />
        <Route path="/conditions/:conditionId" element={<ConditionPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/login" element={<LoginRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

