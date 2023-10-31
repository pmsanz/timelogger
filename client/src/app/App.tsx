import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectForm from "./views/ProjectForm";
import Projects from "./views/Projects";
import LoginForm from "./views/LoginForm";
import TaskView from "./views/TaskView";
import TaskForm from "./views/TaskForm";
import Layout from "./components/layout/Index";

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<ProjectForm />} />
          <Route path="/edit/:projectId" element={<ProjectForm />} />
          <Route path="/taskView/:projectId" element={<TaskView />} />
          <Route path="/createTask/:projectId" element={<TaskForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
