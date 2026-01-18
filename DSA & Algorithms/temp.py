from collections import deque
from typing import List


class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        studs = deque(students)
        sand = deque(sandwiches)

        rotations = 0

        while studs and sand:
            if studs[0] == sand[0]:
                studs.popleft()
                sand.popleft()
                rotations = 0   # reset because someone ate
            else:
                studs.append(studs.popleft())
                rotations += 1

            if rotations == len(studs):
                break

        return rotations
    
s = Solution()
students = [1, 1, 0, 0]
sandwiches = [0, 1, 0, 1]
print(s.countStudents(students, sandwiches))  