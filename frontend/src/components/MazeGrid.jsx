import React, { useState } from 'react';

const MazeGrid = ({ maze, setMaze, start, setStart, end, setEnd, path }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState('wall');

  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    handleCellClick(row, col, true);
  };

  const handleMouseEnter = (row, col) => {
    if (isDrawing) {
      handleCellClick(row, col, true);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCellClick = (row, col, isDrawing) => {
    if (drawMode === 'wall' && isDrawing) {
      const newMaze = maze.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? 1 : c))
      );
      setMaze(newMaze);
    } else if (drawMode === 'start') {
      setStart([row, col]);
    } else if (drawMode === 'end') {
      setEnd([row, col]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${
            drawMode === 'wall' ? 'bg-blue-600' : 'bg-gray-600'
          } hover:bg-blue-700 transition`}
          onClick={() => setDrawMode('wall')}
        >
          Draw Wall
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${
            drawMode === 'start' ? 'bg-green-600' : 'bg-gray-600'
          } hover:bg-green-700 transition`}
          onClick={() => setDrawMode('start')}
        >
          Set Start
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            drawMode === 'end' ? 'bg-red-600' : 'bg-gray-600'
          } hover:bg-red-700 transition`}
          onClick={() => setDrawMode('end')}
        >
          Set End
        </button>
      </div>
      <div
        className="grid gap-0"
        onMouseUp={handleMouseUp}
      >
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const isStart = start[0] === rowIndex && start[1] === colIndex;
              const isEnd = end[0] === rowIndex && end[1] === colIndex;
              const isPath = path.some(([r, c]) => r === rowIndex && c === colIndex);
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 border border-gray-300 transition-all duration-200 ${
                    isStart
                      ? 'bg-green-500'
                      : isEnd
                      ? 'bg-red-500'
                      : isPath
                      ? 'bg-yellow-300'
                      : cell === 1
                      ? 'bg-gray-800'
                      : 'bg-white'
                  } hover:bg-gray-200`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MazeGrid;