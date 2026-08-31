import { Routes, Route, Link } from "react-router-dom";
import BMI from "./BMI";
import Result from "./Result";

function Home() {
  return (
    <div className="page">
      <div className="card">
        <div className="icon">❤️</div>
        <h1>BodyFit</h1>
        <p>Check your Body Mass Index</p>

        <Link to="/bmi">
          <button>Start BMI Calculator →</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bmi" element={<BMI />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;