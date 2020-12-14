import React, { useEffect } from "react";
import { useTimetable } from "./hooks";

const App: React.FC = () => {
  const { createDay } = useTimetable();

  useEffect(() => createDay(1, 2, 502), []);

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <h1 className="display-1">akdakdlk</h1>
      </nav>
    </div>
  );
};

export default App;
