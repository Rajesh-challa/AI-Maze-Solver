import React, { useState } from 'react';
import axios from 'axios';
import MazeGrid from './components/MazeGrid';

const App = () => {
  const [maze, setMaze] = useState(
    Array(20).fill().map(() => Array(20).fill(0))
  );
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([19, 19]);
  const [path, setPath] = useState([]);
  const [noPath, setNoPath] = useState(false); // Track no-path state

  const generateRandomMaze = () => {
    const newMaze = maze.map(row =>
      row.map(() => (Math.random() > 0.7 ? 1 : 0))
    );
    newMaze[start[0]][start[1]] = 0;
    newMaze[end[0]][end[1]] = 0;
    setMaze(newMaze);
    setPath([]);
    setNoPath(false); // Reset no-path message
  };

  const solveMaze = async () => {
    try {
      const response = await axios.post('http://localhost:8000/solve', {
        maze,
        start,
        end,
      });
      setPath(response.data.path);
      setNoPath(response.data.path.length === 0); // Show message if no path
    } catch (error) {
      console.error('Error solving maze:', error);
      setNoPath(true); // Show message on error
    }
  };

  const clearMaze = () => {
    setMaze(Array(20).fill().map(() => Array(20).fill(0)));
    setPath([]);
    setNoPath(false); // Reset no-path message
  };

  return (
    <div className="main-container flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6 text-white title-shadow">
        AI Maze Solver
      </h1>
      {noPath && (
        <div className="no-path-message mb-4 text-red-600 text-xl font-semibold">
          Path not available
        </div>
      )}
      <MazeGrid
        maze={maze}
        setMaze={setMaze}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        path={path}
      />
      <div className="mt-6 space-x-4">
        <button
          className="px-6 py-3 bg-white text-gray-800 border-2 border-d4af37 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition transform hover:scale-105"
          onClick={generateRandomMaze}
        >
          Generate Random Maze
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition transform hover:scale-105"
          onClick={solveMaze}
        >
          Solve Maze
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 transition transform hover:scale-105"
          onClick={clearMaze}
        >
          Clear Maze
        </button>
      </div>
    </div>
  );
};

export default App;