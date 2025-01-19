import Card from "./components/card";
import { useState } from "react";

function App() {
  const [savedTask, setSavedTask] = useState("");

  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen gap-8">
        <Card setSavedTask={setSavedTask} />
        <div className="absolute bottom-0 ">
          {savedTask && (
            <div className="flex flex-col items-center mb-2 hidden ">
              <p className="text-lg text-gray-500">Working on:</p>
              <p className="text-3xl ">{savedTask}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
