import React, { useEffect, useState, useCallback } from "react";
import "./HorizontalCalendar.css";

const daysOfWeek = ["Вс,", "Пн,", "Вт,", "Ср,", "Чт,", "Пт,", "Сб,"];

const HorizontalCalendar = ({ onDateSelect }) => {
  const [calendarDates, setCalendarDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());

  useEffect(() => {
    updateCalendarDates();
  }, [currentStartDate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateCalendarDates = () => {
    const newDates = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentStartDate);
      date.setDate(currentStartDate.getDate() + i);
      return {
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isToday: date.toDateString() === new Date().toDateString(),
      };
    });

    setCalendarDates(newDates);

    const todayDate = newDates.find((d) => d.isToday);
    setSelectedDateIndex(todayDate ? newDates.indexOf(todayDate) : 0);

    const formattedDate = formatDate(new Date(currentStartDate));
    onDateSelect(formattedDate);
  };

  const selectDate = (index) => {
    setSelectedDateIndex(index);
    const selectedDate = new Date(currentStartDate);
    selectedDate.setDate(currentStartDate.getDate() + index);
    const formattedDate = formatDate(selectedDate);
    onDateSelect(formattedDate);
  };

  const moveToNextWeek = () => {
    const nextWeek = new Date(currentStartDate);
    nextWeek.setDate(currentStartDate.getDate() + 7);
    setCurrentStartDate(nextWeek);
  };

  const moveToPreviousWeek = () => {
    const previousWeek = new Date(currentStartDate);
    previousWeek.setDate(currentStartDate.getDate() - 7);
    setCurrentStartDate(previousWeek);
  };

  const isPreviousArrowVisible =
    calendarDates.length > 0 && !calendarDates[0].isToday;

  return (
    <div className="horizontal-calendar">
      <div className="horizontal-calendar__dates">
        {isPreviousArrowVisible && (
          <div
            className="horizontal-calendar__date prev-arrow"
            onClick={moveToPreviousWeek}
          >
            <span>&lt;</span>
          </div>
        )}
        {calendarDates.map((data, index) => (
          <div
            key={data.date}
            className={`horizontal-calendar__date ${
              selectedDateIndex === index ? "selected" : ""
            } ${data.isWeekend ? "weekend" : ""}`}
            onClick={() => selectDate(index)}
          >
            <span className="day-of-week">
              {data.isToday ? "Сегодня" : data.day}
            </span>
            <span className="date-of-month">
              {data.isToday ? `${data.day}${data.date}` : data.date}
            </span>
          </div>
        ))}
        <div
          className="horizontal-calendar__date next-arrow"
          onClick={moveToNextWeek}
        >
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCalendar;
