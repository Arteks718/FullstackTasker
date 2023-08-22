import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import ErrorPage from "./ErrorPage";
import Tasks from "./components/Tasks";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/users"
            element={<Users users={[]} isFetching={false} error={undefined} />}
          />
          <Route
            path="/tasks"
            element={<Tasks tasks={[]} isFetching={false} error={undefined} isEmpty={false} isOpenNewTask={false} isOpenUpdateTask={false} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;