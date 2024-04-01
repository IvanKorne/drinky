import React, { useState, useEffect } from "react";
import yay from "../assets/yay.mp3";
import beer from "../assets/beer.png";
import click from "../assets/click.mp3";
import { Beer, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const createGrid = (num: number) => {
  return new Array(num * num).fill(React.createElement(Beer));
};

const createNewTrigger = (num: number) => {
  return Math.floor(Math.random() * (num * num));
};
const Drinky = () => {
  const [isFound, setIsFound] = useState(false);
  const [mode, setMode] = useState(3);
  const [trigger, setTrigger] = useState<number | undefined>();
  const [beerGrid, setBeerGrid] = useState(createGrid(3));
  const [animationTriggered, setAnimationTriggered] = useState(false); // State to track whether animation has been triggered

  const handleClick = (id: number) => {
    new Audio(click).play();
    if (id === trigger) {
      setIsFound(true);
      return;
    }
    const newGrid = beerGrid.map((beer, beerId) => {
      if (beerId === id) {
        return null;
      }
      return beer;
    });

    setBeerGrid(newGrid);
  };

  const handleRedo = () => {
    setIsFound(false);
    setTrigger(createNewTrigger(mode));
    setBeerGrid(createGrid(mode));
    setAnimationTriggered(false); // Reset animation trigger when redoing
  };
  useEffect(() => {
    setBeerGrid(createGrid(mode));
    setTrigger(createNewTrigger(mode));
  }, [mode]);

  useEffect(() => {
    if (isFound && !animationTriggered) {
      new Audio(yay).play();
      setAnimationTriggered(true); // Set animationTriggered to true to prevent further triggers
    }
  }, [isFound, animationTriggered]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-20 mx-auto bg-gray-900">
      {isFound ? (
        <>
          <div onClick={() => handleRedo()} className="mt-5 cursor-pointer">
            <RefreshCw className="text-white size-[4rem]" />
          </div>
          <motion.img
            initial={{ scale: 1 }}
            animate={animationTriggered ? { scale: [1, 1.5, 2, 2.5, 3] } : {}} // Only apply animation if animationTriggered is true
            transition={{ duration: 2.5 }}
            className="mt-[10rem]"
            src={beer}
            alt="beer"
          />
        </>
      ) : (
        <div className="flex flex-col w-full min-h-screen mx-auto bg-gray-900 ">
          <div className="flex gap-2 px-3 py-2">
            <button
              className={`${
                mode === 3 ? "bg-blue-800" : "bg-blue-900"
              } text-white w-full py-2 px-3 hover:bg-blue-800 rounded-xl text-xl`}
              onClick={() => setMode(3)}
            >
              3x3
            </button>
            <button
              className={`${
                mode === 4 ? "bg-blue-800" : "bg-blue-900"
              } w-full py-2 px-3 text-white hover:bg-blue-800  rounded-xl text-xl`}
              onClick={() => setMode(4)}
            >
              4x4
            </button>
          </div>
          <div className="flex flex-col justify-center min-h-screen">
            <div
              className={`grid ${
                mode === 3 ? "grid-cols-3" : "grid-cols-4"
              } mt-5 mx-2`}
            >
              {beerGrid.map((beer, id) => (
                <div
                  key={id}
                  className="flex items-center justify-center p-5"
                  onClick={() => handleClick(id)}
                >
                  <h1 className="text-yellow-700 size-[8rem]">{beer}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drinky;
