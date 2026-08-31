import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function calculateBMI(e) {
    e.preventDefault();

    if (height === "" || weight === "") {
      setError("Please enter height and weight.");
      return;
    }

    if (height <= 0 || weight <= 0) {
      setError("Please enter valid values.");
      return;
    }

    navigate(`/result?height=${height}&weight=${weight}`);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="icon">⚖️</div>

        <h1>BMI Calculator</h1>
        <p>Enter your details</p>

        <form onSubmit={calculateBMI}>
          <label>Height (cm)</label>

          <input
            type="number"
            placeholder="Example: 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <label>Weight (kg)</label>

          <input
            type="number"
            placeholder="Example: 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {error && <div className="error">{error}</div>}

          <button type="submit">
            Calculate BMI
          </button>
        </form>
      </div>
    </div>
  );
}

export default BMI;