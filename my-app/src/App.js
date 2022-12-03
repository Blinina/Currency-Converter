import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Ruble from "./components/Ruble";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/ruble" element={<Ruble />}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
