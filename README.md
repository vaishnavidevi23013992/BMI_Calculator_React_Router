# Ex06 BMI Calculator
## Date: 

## AIM
To develop a responsive and interactive Body Mass Index (BMI) Calculator using React that allows users to input their height and weight, and calculates their BMI to categorize their health status (e.g., Underweight, Normal, Overweight, Obese).

## DESIGN STEPS

### STEP 1: Initialize React Project

<li>Create a new React app using create-react-app.</li>
<li>Install React Router using:</li>
npm install react-router-dom

### STEP 2: Set Up Routing

Create routing structure with react-router-dom:

<li>Home route (/) – Intro or Navigation</li>

<li>BMI Calculator route (/bmi)</li>

<li>Result route (/result)</li>

### STEP 3: Design the BMI Form Page

<li>Create a form to accept Height (in cm or m) and Weight (in kg).</li>

<li>On form submit, navigate to the result page with entered values via URL query params or context/state.</li>

## STEP 4: Handle Input Validation

<li>Check if height and weight are valid numbers.</li>

<li>Optionally, show error messages for invalid inputs.</li>

### STEP 5: Perform BMI Calculation

<li>In the result component:

<li>Extract height and weight from the route (URL or passed state).</li>

<li>Apply the BMI formula:</li>

![image](https://github.com/user-attachments/assets/ec785506-c96b-489e-8783-fb1a5d36101a)
​
 
<li>Convert height from cm to m if needed.</li></li>

### STEP 6: Display Result

<li>Show calculated BMI.</li>

<li>Show category based on BMI range:

<li>Underweight, Normal, Overweight, Obese, etc.</li></li>

### STEP 7: Navigation Options

<li>Provide a button to go back to the BMI form to calculate again.</li>

### STEP 8: Enhancements

<li>Add styling using CSS or Tailwind.</li>

## PROGRAM
# src/main.jsx
```
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
# src/App.jsx
```
import { Routes, Route, Link } from "react-router-dom";
import BMI from "./BMI";
import Result from "./Result";

function Home() {
  return (
    <div className="page">
      <div className="card">
        <div className="icon">❤️</div>

        <h1>BodyFit</h1>

        <p>Know your BMI. Know your health.</p>

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
```
# src/BMI.jsx
```
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function calculateBMI(e) {
    e.preventDefault();

    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    if (height <= 0 || weight <= 0) {
      setError("Please enter valid values.");
      return;
    }

    if (height < 50 || height > 250) {
      setError("Height must be between 50 and 250 cm.");
      return;
    }

    if (weight < 10 || weight > 300) {
      setError("Weight must be between 10 and 300 kg.");
      return;
    }

    navigate(`/result?height=${height}&weight=${weight}`);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="icon">⚖️</div>

        <h1>BMI Calculator</h1>

        <p>Enter your height and weight</p>

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

          {error && <p className="error">⚠️ {error}</p>}

          <button type="submit">
            Calculate BMI →
          </button>
        </form>

        <Link to="/" className="back">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default BMI;
```
# src/Result.jsx
```
import { Link, useSearchParams } from "react-router-dom";

function Result() {
  const [searchParams] = useSearchParams();

  const height = Number(searchParams.get("height"));
  const weight = Number(searchParams.get("weight"));

  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);

  let category;
  let emoji;

  if (bmi < 18.5) {
    category = "Underweight";
    emoji = "🌱";
  } else if (bmi < 25) {
    category = "Normal Weight";
    emoji = "💚";
  } else if (bmi < 30) {
    category = "Overweight";
    emoji = "💛";
  } else {
    category = "Obese";
    emoji = "❤️";
  }

  return (
    <div className="page">
      <div className="card">
        <div className="icon">{emoji}</div>

        <p className="small-title">YOUR BMI RESULT</p>

        <div className="bmi">
          {bmi.toFixed(2)}
        </div>

        <h2>{category}</h2>

        <div className="details">
          <p>
            Height: <b>{height} cm</b>
          </p>

          <p>
            Weight: <b>{weight} kg</b>
          </p>
        </div>

        <p className="message">
          Keep following healthy habits and stay active! 💪
        </p>

        <Link to="/bmi">
          <button>Calculate Again ↻</button>
        </Link>

        <Link to="/" className="back">
          ← Home
        </Link>
      </div>
    </div>
  );
}

export default Result;
```
# style.css
```
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: white;
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #141e30, #243b55);
}

.card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}

.icon {
  font-size: 55px;
}

h1 {
  font-size: 36px;
  margin: 15px 0;
}

p {
  color: #dbeafe;
}

form {
  margin-top: 25px;
}

label {
  display: block;
  text-align: left;
  margin: 15px 0 7px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  outline: none;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  transform: translateY(-3px);
}

.error {
  color: #fecaca;
  background: rgba(255, 0, 0, 0.15);
  padding: 10px;
  border-radius: 10px;
}

.back {
  display: block;
  margin-top: 20px;
  color: #c4b5fd;
  text-decoration: none;
}

.bmi {
  font-size: 70px;
  font-weight: bold;
  color: #c084fc;
  margin: 20px 0;
}

.small-title {
  letter-spacing: 3px;
  font-size: 12px;
  color: #94a3b8;
}

.details {
  padding: 10px;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.message {
  line-height: 1.5;
}

@media (max-width: 500px) {
  .card {
    padding: 30px 20px;
  }

  h1 {
    font-size: 30px;
  }

  .bmi {
    font-size: 55px;
  }
}
```


## OUTPUT

![alt text](<Screenshot 2026-08-31 083754.png>)

![alt text](<Screenshot 2026-08-31 083834.png>)

![alt text](<Screenshot 2026-08-31 083856.png>)



## RESULT
The BMI Calculator successfully takes user input for height and weight, performs the BMI calculation in real-time using React state and event handling, and displays the BMI value along with the corresponding health category.
