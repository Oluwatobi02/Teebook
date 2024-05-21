import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Posting from './pages/Posting';
import ArticlePage from './pages/ArticlePage';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path='/post/:postid' loader={({ params }) =>{console.log(params.title)}} action={({ params }) => {}} element={<ArticlePage />} />
        <Route exact path="/makepost" element={<Posting />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;