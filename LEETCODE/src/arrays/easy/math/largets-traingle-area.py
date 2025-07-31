points1 = [[0,0],[0,1],[1,0],[0,2],[2,0]]
points2 = [[1,0],[0,0],[0,1]]

import itertools

class Solution(object):
    def largestTriangleArea(self, points):
        max_area = 0
        for a, b, c in itertools.combinations(points, 3):
            area = abs(
                a[0]*(b[1]-c[1]) +
                b[0]*(c[1]-a[1]) +
                c[0]*(a[1]-b[1])
            ) / 2.0
            if area > max_area:
                max_area = area
        return max_area

s = Solution()
print(s.largestTriangleArea(points1))
print(s.largestTriangleArea(points2))
