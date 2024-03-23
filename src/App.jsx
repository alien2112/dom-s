import React, { useEffect, useState } from "react";
import Bar from "./components/bar";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Home from "./pages/home";
import Menu from "./pages/menu";
import About from "./pages/about";



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);
  return (
    <div
      className={
        " " + (theme === `light` ? `bg-[#ced8ff]` : `bg-[#222]`)
      }
    >
      <Router>
        <Bar className="navbar" theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/account" element={<Form />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
