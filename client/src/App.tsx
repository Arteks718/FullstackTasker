import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import ErrorPage from "./ErrorPage";
import Tasks from "./components/Tasks";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a906437... Add component HomePage
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
<<<<<<< HEAD
            element={<Tasks tasks={[]} isFetching={false} error={undefined} isEmpty={false} isOpenNewTask={false} isOpenUpdateTask={false} />}
=======
            element={<Tasks tasks={[]} isFetching={false} error={undefined} />}
>>>>>>> a906437... Add component HomePage
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
=======
import HomePage from "./components/HomePage";
>>>>>>> a906437... Add component HomePage

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
            element={<Tasks tasks={[]} isFetching={false} error={undefined} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

<<<<<<< HEAD
export default App;
>>>>>>> 2e1a96d (Add component tasks+slice)
=======
export default App;
>>>>>>> a906437... Add component HomePage
=======
export default App;
>>>>>>> a906437... Add component HomePage
