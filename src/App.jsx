// src/App.jsx
import React from "react";
import Poll from "./components/Poll";

const pollIds = ["poll1", "poll2"];

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">📊 Encuesta en Tiempo Real</h1>
      <div className="max-w-3xl mx-auto space-y-10">
        {pollIds.map((id) => (
          <Poll key={id} pollId={id} />
        ))}
      </div>
    </div>
  );
}

export default App;
