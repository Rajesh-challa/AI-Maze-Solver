from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Tuple
from maze_solver import a_star

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MazeRequest(BaseModel):
    maze: List[List[int]]
    start: Tuple[int, int]
    end: Tuple[int, int]

@app.post("/solve")
async def solve_maze(request: MazeRequest):
    path = a_star(request.maze, request.start, request.end)
    return {"path": path}