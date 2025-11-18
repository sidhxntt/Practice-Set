from collections import deque

class Graph:
    def __init__(self):
        self.adjacency_list = {} # key: vertex, value: list of adjacent vertices connected by edges

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = [] # initialize empty list of neighbors

    def add_edge_undirected(self, from_vertex, to_vertex):
        if from_vertex not in self.adjacency_list:
            self.add_vertex(from_vertex)
        if to_vertex not in self.adjacency_list:
            self.add_vertex(to_vertex)

        # Undirected graph: add both ways
        self.adjacency_list[from_vertex].append(to_vertex)
        self.adjacency_list[to_vertex].append(from_vertex)
    
    def add_edge_directed(self, from_vertex, to_vertex):
        if from_vertex not in self.adjacency_list:
            self.add_vertex(from_vertex)
        if to_vertex not in self.adjacency_list:
            self.add_vertex(to_vertex)

        # Directed graph: add only one way
        self.adjacency_list[from_vertex].append(to_vertex)

    def remove_edge(self, from_vertex, to_vertex):
        if from_vertex in self.adjacency_list:
            if to_vertex in self.adjacency_list[from_vertex]:
                self.adjacency_list[from_vertex].remove(to_vertex)

        if to_vertex in self.adjacency_list:
            if from_vertex in self.adjacency_list[to_vertex]:
                self.adjacency_list[to_vertex].remove(from_vertex)

    def remove_vertex(self, vertex):
        if vertex in self.adjacency_list:
            # iterate over copy to avoid modifying while looping
            for neighbor in list(self.adjacency_list[vertex]):
                self.adjacency_list[neighbor].remove(vertex)
            del self.adjacency_list[vertex]

    def get_neighbors(self, vertex):
        return self.adjacency_list.get(vertex, [])

    def __str__(self):
        return str(self.adjacency_list)
    
class GraphOperations(Graph):
    def __init__(self):
        super().__init__()

    @staticmethod
    def bfs(self, start_vertex):
        # queue for BFS
        # Put the first vertex in the queue and mark it as visited then repeat the process
        visited = set()  # to keep track of visited vertices
        queue = deque([start_vertex])  # initialize queue with start vertex
        visited.add(start_vertex)  # mark start vertex as visited

        while queue:
            current = queue.popleft()  # pop from left end for current vertex
            for neighbor in self.get_neighbors(current): # explore its neighbors
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)  # append at right end

        return visited
    
    @staticmethod
    def dfs(self, start_vertex, visited=None):
        #  stack for DFS as we use recursion
        if visited is None:
            visited = set()
        visited.add(start_vertex)
        for neighbor in self.get_neighbors(start_vertex):
            if neighbor not in visited:
                GraphOperations.dfs(self, neighbor, visited)
        return visited
    
    @staticmethod
    def shortest_path(self, start_vertex, target_vertex):
        # best to use BFS to find the shortest path in an unweighted graph
        visited = set()
        queue = deque([(start_vertex, [start_vertex])])  # store (vertex, path to vertex)

        while queue:
            current, path = queue.popleft()
            if current == target_vertex:
                return path  # return the path when target is found
            for neighbor in self.get_neighbors(current):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))

        return None  # return None if no path found
    
    @staticmethod
    def detect_cycle_undirected(self):
        # best to use se DFS to detect cycle in an undirected graph
        visited = set()

        def dfs(vertex, parent):
            visited.add(vertex)
            for neighbor in self.get_neighbors(vertex):
                if neighbor not in visited:
                    if dfs(neighbor, vertex):
                        return True
                elif neighbor != parent:
                    return True
            return False

        for v in self.adjacency_list:
            if v not in visited:
                if dfs(v, None):
                    return True
        return False

    
if __name__ == "__main__":
    g = GraphOperations()
    g.add_edge_undirected(1, 2)
    g.add_edge_undirected(1, 3)
    g.add_edge_undirected(2, 4)
    g.add_edge_undirected(3, 4)
    g.add_edge_undirected(4, 5)

    print("Graph adjacency list:")
    print(g)

    print("BFS starting from vertex 1:")
    print(GraphOperations.bfs(g, 1))

    print("DFS starting from vertex 1:")
    print(GraphOperations.dfs(g, 1))

    print("Shortest path from 1 to 5:")
    print(GraphOperations.shortest_path(g, 1, 5))

    print("Cycle detected in undirected graph:")
    print(GraphOperations.detect_cycle_undirected(g))

    
   
