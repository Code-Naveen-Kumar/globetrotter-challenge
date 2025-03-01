import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Challenge from "./pages/Challenge";

function App() {
  return (
    <Router>
      <Header /> {/* Now uses Header from Header.jsx */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </Router>
  );
}

export default App;
