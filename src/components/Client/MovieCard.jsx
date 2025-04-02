import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ film, seances, halls, selectedDate, onSeanceSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isHallVisible, setHallVisible] = useState(false);
  const currentTime = new Date();

  const seancesByHall = seances.reduce((acc, seance) => {
    const hallId = seance.seance_hallid;
    acc[hallId] = acc[hallId] || [];
    acc[hallId].push(seance);
    return acc;
  }, {});

  const handleTimeClick = (seance) => {
    setSelectedTime(seance);
    setHallVisible(true);
    onSeanceSelect(seance);
  };

  return (
    <div className="movie-card">
      <div className="movie-card-poster-info-container">
        <div className="movie-poster-container">
          <img
            src={film.film_poster}
            alt={film.film_name}
            className="movie-poster"
          />
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{film.film_name}</h3>
          <p className="film-description">{film.film_description}</p>
          <span className="film-duration">{film.film_duration} минут</span>
          <span className="film-origin">{film.film_origin}</span>
        </div>
      </div>
      <div className="seance-times">
        {halls.map((hall) => {
          const filmSeances = (seancesByHall[hall.id] || []).filter(
            (seance) => seance.seance_filmid === film.id
          );
          if (filmSeances.length > 0) {
            filmSeances.sort((a, b) => {
              const timeA = a.seance_time.split(":").map(Number);
              const timeB = b.seance_time.split(":").map(Number);
              return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
            });
            return (
              <div key={hall.id}>
                <h4>{hall.hall_name}</h4>
                <ul className="seance-times_list">
                  {filmSeances.map((seance) => {
                    const seanceDate = new Date(selectedDate);
                    const [hours, minutes] = seance.seance_time
                      .split(":")
                      .map(Number);
                    seanceDate.setHours(hours, minutes);
                    const isPast = seanceDate < currentTime;

                    return (
                      <li
                        key={seance.id}
                        className={`seance-time ${
                          isPast ? "_time_disabled" : ""
                        }`}
                        onClick={() => !isPast && handleTimeClick(seance)}
                      >
                        {seance.seance_time}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default MovieCard;
