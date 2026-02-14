from heapq import heappop, heappush
from typing import List, Tuple

def manhattan_distance(p1: Tuple[int, int], p2: Tuple[int, int]) -> int:
    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])

def a_star(maze: List[List[int]], start: Tuple[int, int], end: Tuple[int, int]) -> List[Tuple[int, int]]:
    rows, cols = len(maze), len(maze[0])
    open_set = [(0, start)]
    came_from = {}
    
    g_score = {start: 0}
    f_score = {start: manhattan_distance(start, end)}
    
    while open_set:
        _, current = heappop(open_set)
        
        if current == end:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]
        
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            neighbor = (current[0] + dx, current[1] + dy)
            if 0 <= neighbor[0] < rows and 0 <= neighbor[1] < cols and maze[neighbor[0]][neighbor[1]] != 1:
                tentative_g_score = g_score[current] + 1
                
                if tentative_g_score < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g_score
                    f_score[neighbor] = tentative_g_score + manhattan_distance(neighbor, end)
                    heappush(open_set, (f_score[neighbor], neighbor))
    
    return []