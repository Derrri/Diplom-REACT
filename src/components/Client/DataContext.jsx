import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [halls, setHalls] = useState([]);
  const [films, setFilms] = useState([]);
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://shfe-diplom.neto-server.ru/alldata"
        );
        const data = await response.json();
        if (data.success) {
          setFilms(data.result.films || []);
          setSeances(data.result.seances || []);
          setHalls(data.result.halls || []);
          console.log(data.result);
        } else {
          console.error("Ошибка загрузки данных:", data.message);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchHallConfig = async (seanceId, date) => {
    try {
      const response = await fetch(
        `https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${date}`
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.result);
        return data.result;
      } else {
        console.error("Ошибка загрузки конфигурации зала:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при получении конфигурации зала:", error);
    }
  };

  const bookTickets = async (seanceId, ticketDate, tickets) => {
    const formData = new FormData();
    formData.append("seanceId", seanceId);
    formData.append("ticketDate", ticketDate);
    formData.append("tickets", JSON.stringify(tickets));

    try {
      const response = await fetch(
        "https://shfe-diplom.neto-server.ru/ticket",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Бронирование успешно:", data.result);
        return data.result;
      } else {
        console.error("Ошибка бронирования:");
        alert("Ошибка бронирования: выберите места для бронирования.");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{ halls, films, seances, loading, fetchHallConfig, bookTickets }}
    >
      {children}
    </DataContext.Provider>
  );
};
