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

        <h1>Your BMI</h1>

        <div className="bmi">
          {bmi.toFixed(2)}
        </div>

        <h2>{category}</h2>

        <div className="details">
          <p>Height: <b>{height} cm</b></p>
          <p>Weight: <b>{weight} kg</b></p>
        </div>

        <Link to="/bmi">
          <button>Calculate Again ↻</button>
        </Link>

        <br />

        <Link to="/">
          <button className="home-btn">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;