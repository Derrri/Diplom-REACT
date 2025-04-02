import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeWrapper from "./components/Client/HomeWrapper";
import Home from "./components/Client/Home";
import Hall from "./components/Client/Hall-hall_components/Hall";
import Payment from "./components/Client/Payment";
import Ticket from "./components/Client/Ticket";
import { DataProvider } from "./components/Client/DataContext";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomeWrapper showLogin={true}>
                <Home />
              </HomeWrapper>
            }
          />
          <Route
            path="/Hall"
            element={
              <HomeWrapper showLogin={false}>
                <Hall />
              </HomeWrapper>
            }
          />
          <Route
            path="/Payment"
            element={
              <HomeWrapper showLogin={false}>
                <Payment />
              </HomeWrapper>
            }
          />
          <Route
            path="/Ticket"
            element={
              <HomeWrapper showLogin={false}>
                <Ticket />
              </HomeWrapper>
            }
          />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
