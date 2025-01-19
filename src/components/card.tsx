import { useState, useEffect } from "react";
import { Play, RotateCcw, Pause } from "lucide-react";

const Card = ({ setSavedTask }: { setSavedTask: (task: string) => void }) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(300);
  const [isCounting, setIsCounting] = useState(false);

  const addTask = () => {
    setSavedTask(task);
  };

  const startCountdown = () => {
    setIsCounting(true);
  };

  const pauseCountdown = () => {
    setIsCounting(false);
  };

  const resetCountdown = () => {
    setIsCounting(false);
    setTime(300);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [minutes, seconds] = e.target.value.split(":").map(Number);
    setTime(minutes * 60 + (seconds || 0));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, time]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-100 to-gray-200  p-3 rounded-2xl shadow-xl">
      <div className="border-white border p-3 w-72 bg-white rounded-xl h-72 flex flex-col justify-between ">
        <div className="flex flex-row font-mono justify-between w-full">
          <input
            className="w-36 outline-none tracking-[-0.3px] font-light "
            type="text"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            placeholder="Add a task"
          ></input>
          <button
            className="bg-orange-500 text-white p-2 w-20 rounded-lg text-xs hover:bg-opacity-80 transition-colors duration-200"
            onClick={addTask}
          >
            Commit
          </button>
        </div>
        <div>
          <input
            type="text"
            value={formatTime(time)}
            onChange={handleTimeChange}
            className="text-6xl w-full font-mono timer"
          ></input>
          <div className="flex justify-between ">
            <p className="font-mono font-light  text-gray-400">Stay focused.</p>

            <div className="flex gap-2">
              <button>
                {isCounting ? (
                  <Pause
                    onClick={pauseCountdown}
                    className="bg-gray-200 stroke-1 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200"
                  />
                ) : (
                  <Play
                    onClick={startCountdown}
                    className="bg-gray-200 stroke-1 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200"
                  />
                )}
              </button>
              <button onClick={resetCountdown}>
                <RotateCcw className=" bg-gray-200 stroke-1 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
