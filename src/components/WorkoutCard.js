import React from "react";
import "./WorkoutCard.css";
import { uuid } from "uuidv4";

function WorkoutCard(data) {
  const { exercises, name, duration, date } = data;
  const key = uuid();

  return (
    <div key={key} className="workout-card">
      <h2>{name}</h2>
      <h3>Workout</h3>
      <div className="workout-card__exercises">
        {exercises.map(exercise => (
          <li key={uuid()}>{exercise}</li>
        ))}
      </div>
      <h4>duration: {duration / 60} min</h4>
      <h4>{date}</h4>
    </div>
  );
}

export default WorkoutCard;
