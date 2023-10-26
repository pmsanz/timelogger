import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Assuming you have a CSS file for styling
import ProjectForm from "./views/ProjectForm";
import Projects from "./views/Projects";
import LoginForm from "./views/LoginForm";
import TaskView from "./views/TaskView";
import TaskForm from "./views/TaskForm";



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My Time Logger</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create New Project</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/taskView/:projectId" element={<TaskView />} />
            <Route path="/create" element={<ProjectForm />} />
            <Route path="/createTask/:projectId" element={<TaskForm />} />
            <Route path="/edit/:projectId" element={<ProjectForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;