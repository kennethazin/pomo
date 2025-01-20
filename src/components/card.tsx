import { useState, useEffect } from "react";
import { Play, RotateCcw, Pause, Settings2, Plus, Minus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";

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

  const adjustTime = (adjustment: number) => {
    setTime((prevTime) => Math.max(0, prevTime + adjustment));
  };

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
          <Drawer>
            <DrawerTrigger asChild>
              <Settings2 className="stroke-2 bg-gray-200 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200" />
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm mb-20">
                <DrawerHeader>
                  <DrawerTitle>Settings</DrawerTitle>
                  <DrawerDescription>Set your Pomo timer.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => adjustTime(-300)}
                      disabled={time <= 60}
                    >
                      <Minus />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-base tracking-tighter font-mono ">
                        {formatTime(time)}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Minutes
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => adjustTime(300)}
                    >
                      <Plus />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <button className="bg-orange hidden text-white p-2 w-20 rounded-lg text-xs hover:bg-opacity-80 transition-colors duration-200">
            Commit
          </button>
        </div>
        <div>
          <div className="text-6xl w-full font-mono timer mb-5">
            {formatTime(time)}
          </div>
          <div className="flex justify-between ">
            <p className="font-mono font-light  text-gray-400">Stay focused.</p>

            <div className="flex gap-2">
              <button>
                {isCounting ? (
                  <Pause
                    onClick={pauseCountdown}
                    className="bg-gray-200 stroke-2 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200"
                  />
                ) : (
                  <Play
                    onClick={startCountdown}
                    className="bg-gray-200 stroke-2 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200"
                  />
                )}
              </button>
              <button onClick={resetCountdown}>
                <RotateCcw className=" bg-gray-200 stroke-2 p-2 rounded-full w-8 h-8 hover:bg-opacity-60 transition-colors  duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
