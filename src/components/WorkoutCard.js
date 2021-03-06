import React from "react";
import "../css/WorkoutCard.css";
import { uuid } from "uuidv4";

function WorkoutCard(data) {
  const { exercises, name, duration, date, time } = data;
  const key = uuid();

  return (
    <div key={key} className="workout-card">
      <h2>{name.toLowerCase()}</h2>
      <h3>workout</h3>
      <div className="workout-card__exercises">
        {exercises.map(exercise => (
          <li key={uuid()}>{exercise}</li>
        ))}
      </div>
      <h4>
        duration: {duration / 60} min <br /> {date} <br /> {time}
      </h4>
    </div>
  );
}

export default WorkoutCard;
