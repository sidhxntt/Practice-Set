
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
        Solve the Minimum Spanning Tree problem using Kruskal's algorithm.

        :param edges: List of edges in the format (weight, vertex1, vertex2)
        :param num_vertices: Number of vertices in the graph
        :return: List of edges in the Minimum Spanning Tree
        """
        # Sort edges based on weight
        edges.sort(key =lambda x: x[0])
        print(f"Sorted edges by weight: {edges}")

        parent = list(range(num_vertices))
        rank = [0] * num_vertices

        def find(v):
            if parent[v] != v:
                parent[v] = find(parent[v])
            return parent[v]

        def union(v1, v2):
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
        for weight, u, v in edges:
            if find(u) != find(v):
                union(u, v)
                mst.append((weight, u, v))
                print(f"Added edge to MST: weight={weight}, vertices=({u}, {v})")

        return mst
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
            edges = [
                (10, 0, 1),
                (6, 0, 2),
                (5, 0, 3),
                (15, 1, 3),
                (4, 2, 3)
            ]
            num_vertices = 4
            print("Edges (weight, vertex1, vertex2):", edges)
            mst = g.kruskal_mst(edges, num_vertices)
            print("Edges in the Minimum Spanning Tree:", mst)
            print("--------------------------------------------------")
            print("\n")

        fractional_knapsack()
        activity_selection()
        kruskal_mst()

    main()