
class GreedyAlgorithm:
    def __init__(self):
        pass

    def _fractional_knapsack(self, weights, values, capacity):
        """
        Solve the fractional knapsack problem using a greedy approach.

        :param weights: List of weights of the items
        :param values: List of values of the items
        :param capacity: Maximum weight capacity of the knapsack
        :return: Maximum value that can be carried in the knapsack
        """
        # Create a list of item indices used for sorting 
        index = list(range(len(values)))
        print(f"Initial index: {index}")

        # Calculate value to weight ratio [v/w for each item]
        ratio = [v/w for v, w in zip(values, weights)]
        print(f"ZIP values and weights: {list(zip(values, weights))}")
        print(f"Value to weight ratio: {ratio}")

        # Sort items by ratio in descending order 
        index.sort(key=lambda i: ratio[i], reverse=True) 
        print(f"Sorted index by ratio: {index}")

        max_value = 0
        for i in index:
            if weights[i] <= capacity:
                # If the item can be added fully
                capacity -= weights[i]
                max_value += values[i]
                print(f"Added full item {i}: weight={weights[i]}, value={values[i]}, remaining capacity={capacity}, total value={max_value}")
            else:
                # If the item can only be added partially
                max_value += values[i] * (capacity / weights[i])
                print(f"Added partial item {i}: weight={capacity}, value={values[i] * (capacity / weights[i])}, total value={max_value}")
                break

        return max_value
    
    def _activity_selection(self, start_times, finish_times):
        """
        Solve the activity selection problem using a greedy approach.

        :param start_times: List of start times of activities
        :param finish_times: List of finish times of activities
        :return: List of selected activities
        """
        # Combine start and finish times into a list of tuples and sort by finish times
        activities = sorted(zip(start_times, finish_times), key=lambda x: x[1])
        print(f"Sorted activities by finish times: {activities}")

        selected_activities = []
        last_finish_time = 0

        for start, finish in activities:
            if start >= last_finish_time:
                selected_activities.append((start, finish))
                last_finish_time = finish
                print(f"Selected activity: start={start}, finish={finish}")

        return selected_activities
    
    def kruskal_mst(self, edges, num_vertices):
        """
        Think of every vertex as a separate island.Each edge is a bridge with a cost (weight).Your job in Kruskal’s algorithm is:
        👉 Build the cheapest possible network of bridges so that every island becomes connected, without creating loops (loops = cycles).
        Solve the Minimum Spanning Tree problem using Kruskal's algorithm.
        And why do we need DSU here? To efficiently check and avoid cycles when adding edges to the MST. DFS or BFS can also be used for cycle detection, but they are less efficient compared to DSU, especially when dealing with a large number of edges and vertices.

        :param edges: List of edges in the format (weight, vertex1, vertex2)
        :param num_vertices: Number of vertices in the graph
        :return: List of edges in the Minimum Spanning Tree
        """
        # Sort edges based on weight
        edges.sort(key =lambda x: x[2]) # x[2] is weight
        print(f"Sorted edges by weight: {edges}")

        parent = list(range(num_vertices)) # [0, 1, 2, ..., num_vertices-1]
        rank = [0] * num_vertices # [0, 0, 0, ..., 0]

        def find(v):
            "To find the root of the set in which element v is or which set v belongs to"
            "Each vertex is its own parent. If not, recursively find the root parent and apply path compression."
            if parent[v] != v:
                parent[v] = find(parent[v])
            return parent[v]

        def union(v1, v2):
            "To unite two sets containing elements v1 and v2 and changing their parents accordingly to their ranks"
            root1 = find(v1)
            root2 = find(v2)
            if root1 != root2:
                if rank[root1] > rank[root2]:
                    parent[root2] = root1
                elif rank[root1] < rank[root2]:
                    parent[root1] = root2
                else:
                    parent[root2] = root1
                    rank[root1] += 1

        mst = []
        min_cost = 0
        for u, v, weight in edges:
            if find(u) != find(v): # if u and v are in different sets ie. vertex u and v are not connected as they have different roots therefore adding this edge won't form a cycle 
                union(u, v) # connect the two vertices
                mst.append((u, v, weight)) # add edge to MST
                min_cost += weight
                print(f"Added edge to MST: weight={weight}, vertices=({u}, {v})")
                print(f"Current minimum cost of MST: {min_cost}")

        return mst
    
    def prim_mst(self, graph):
        """
        Solve the Minimum Spanning Tree problem using Prim's algorithm.

        :param graph: Adjacency list representation of the graph where graph[u] = [(v1, weight1), (v2, weight2), ...]
        :return: List of edges in the Minimum Spanning Tree
        """
        import heapq

        start_vertex = 0 # we start building the MST from vertex 0 (you can choose any vertex).
        visited = set([start_vertex]) # to keep track of vertices included in the MST
        edges = [
            (weight, start_vertex, to)
            for to, weight in graph[start_vertex]
        ]
        heapq.heapify(edges) # create a min-heap from the edges to efficiently get the edge with the smallest weight

        mst = []
        min_cost = 0

        while edges:
            weight, frm, to = heapq.heappop(edges)
            if to not in visited:
                visited.add(to)
                mst.append((frm, to, weight))
                min_cost += weight
                print(f"Added edge to MST: weight={weight}, vertices=({frm}, {to})")
                print(f"Current minimum cost of MST: {min_cost}")

                for to_next, weight in graph[to]:
                    if to_next not in visited:
                        heapq.heappush(edges, (weight, to, to_next))

        return mst
    
    def Dijsktra(self, graph, start_vertex):
        """
        Solve the shortest path problem from a starting vertex to all other vertices using Dijkstra's algorithm.

        :param graph: Adjacency list representation of the graph where graph[u] = [(v1, weight1), (v2, weight2), ...]
        :param start_vertex: The starting vertex for Dijkstra's algorithm
        :return: Dictionary of shortest distances from start_vertex to each vertex
        """
        import heapq

        # Distance dictionary
        dist = {vertex: float('inf') for vertex in graph}
        dist[start_vertex] = 0

        # Min-heap: (distance, node)
        heap = [(0, start_vertex)]
        heapq.heapify(heap)

        while heap:
            curr_dist, u = heapq.heappop(heap)

            # Skip stale entries
            if curr_dist > dist[u]:
                continue
            
            # Relax edges
            for v, weight in graph[u]: # get neighbors and weights for current vertex u coming from min-heap
                new_dist = curr_dist + weight
                if new_dist < dist[v]:
                    dist[v] = new_dist
                    heapq.heappush(heap, (new_dist, v))
                    print(f"Updated distance for vertex {v}: {new_dist}")
        return dist

if __name__ == "__main__":
    def main():
        g = GreedyAlgorithm()
        
        def fractional_knapsack():
            print("Fractional Knapsack Problem using Greedy Algorithm")
            print("--------------------------------------------------")
            weights = [30, 20, 10]
            values = [120, 100, 60]
            capacity = 50
            print("Weights:", weights)
            print("Values:", values)
            print("Capacity:", capacity)
            max_val = g._fractional_knapsack(weights, values, capacity)
            print(f"Maximum value in Knapsack = {max_val}")
            print("--------------------------------------------------")
            print("\n")

        def activity_selection():
            print("Activity Selection Problem using Greedy Algorithm")
            print("--------------------------------------------------")
            start_times = [1, 3, 0, 5, 8, 5]
            finish_times = [2, 4, 6, 7, 9, 9]
            print("Start times:", start_times)
            print("Finish times:", finish_times)
            selected_activities = g._activity_selection(start_times, finish_times)
            print("Selected activities (start, finish):", selected_activities)
            print("--------------------------------------------------")
            print("\n")

        def kruskal_mst():
            print("Kruskal's Algorithm for Minimum Spanning Tree")
            print("--------------------------------------------------")
            # Define edges as ( vertex1, vertex2, weight)
            edges = [
                ( 0, 1,10),
                ( 0, 2, 6),
                ( 0, 3, 5),
                ( 1, 3, 15),
                ( 2, 3, 4)
            ]
            num_vertices = 4
            print("Edges (vertex1, vertex2, weight):", edges)
            mst = g.kruskal_mst(edges, num_vertices)
            print("Edges in the Minimum Spanning Tree:", mst)
            print("--------------------------------------------------")
            print("\n")
        
        def prim_mst():
            print("Prim's Algorithm for Minimum Spanning Tree")
            print("--------------------------------------------------")
            # Define graph as adjacency list vertex: [(neighbor1, weight1), (neighbor2, weight2), ...]
            graph = {
                0: [(1, 10), (2, 6), (3, 5)],
                1: [(0, 10), (3, 15)],
                2: [(0, 6), (3, 4)],
                3: [(0, 5), (1, 15), (2, 4)]
            }
            print("Graph adjacency list:", graph)
            mst = g.prim_mst(graph)
            print("Edges in the Minimum Spanning Tree:", mst)
            print("--------------------------------------------------")
            print("\n")

        def dijkstra():
            print("Dijkstra's Algorithm for Shortest Path")
            print("--------------------------------------------------")
            # Define graph as adjacency list vertex: [(neighbor1, weight1), (neighbor2, weight2), ...]
            graph = {
                0: [(1, 4), (2, 1)],
                1: [(3, 1)],
                2: [(1, 2), (3, 5)],
                3: []
            }
            start_vertex = 0
            print("Graph adjacency list:", graph)
            print("Starting vertex:", start_vertex)
            distances = g.Dijsktra(graph, start_vertex)
            print("Shortest distances from vertex", start_vertex, ":", distances)
            print("--------------------------------------------------")
            print("\n")
       
        fractional_knapsack()
        activity_selection()
        kruskal_mst()
        prim_mst()  
        dijkstra()
    main()