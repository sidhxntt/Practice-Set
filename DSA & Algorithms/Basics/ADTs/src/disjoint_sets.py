from graph import GraphOperations

class DisjointSet(GraphOperations):
    def __init__(self):
        super().__init__()
        pass

    def find(self,parent, v):
        """
        This function finds the leader/representative of the set that contains v. So that we can know which set v belongs to. If both a and b have the same leader, they are in the same set.
        If the person v is not the leader
        Follow the chain:
            parent of v
            parent of parent of v
        Finally find the leader.
        Path compression means:
            When you finally find the leader, you say:
            “Everyone I passed on the way should now point DIRECTLY to the leader.”
        This makes future searches faster.
        """
        if parent[v] != v: # parent[x] tells you the representative/root of the set containing x. If parent[v] == v, v is the root of its group → return v
            parent[v] = self.find(parent, parent[v])  # path compression , It flattens the tree so future lookups become extremely fast.
        return parent[v]

    def union(self,parent, rank, a, b):
        """
        Two school groups are standing. Each group has a leader. When two groups join, the leader with the higher rank/weight (stronger group) becomes boss. If both leaders have same strength → choose one, and increase its rank.
        """
        root_a = self.find(parent, a)
        root_b = self.find(parent, b)
        if root_a == root_b:
            return False # already in the same set
        # union by rank
        if rank[root_a] > rank[root_b]:
             parent[root_b] = root_a
        elif rank[root_a] < rank[root_b]:
            parent[root_a] = root_b
        else:
            parent[root_b] = root_a
            rank[root_a] += 1
        return True
    
    def cycle_detection(self):
        # initialize DSU
        parent = {v: v for v in self.adjacency_list}
        rank = {v: 0 for v in self.adjacency_list}

        # avoid processing the same undirected edge twice
        seen = set()

        for u in self.adjacency_list:
            for v in self.adjacency_list[u]:
                edge = tuple(sorted((u, v)))
                if edge in seen:
                    continue
                seen.add(edge)

                root_u = self.find(parent, u)
                root_v = self.find(parent, v)
                if root_u == root_v:
                    # u and v already connected → adding edge creates a cycle
                    return True
                self.union(parent, rank, u, v)
            return False

if __name__ == "__main__":
    def main():
        def set1():
            ds1 = DisjointSet()
            
            ds1.add_edge_undirected(1, 2)
            ds1.add_edge_undirected(2, 3)
            ds1.add_edge_undirected(3, 4)
            ds1.add_edge_undirected(4, 1)  # This edge creates a cycle

            print("BFS starting from vertex 1 for Set 1:")
            print(GraphOperations.bfs(ds1, 1))

            print("DFS starting from vertex 1 for Set 1:")
            print(GraphOperations.dfs(ds1, 1))

            print("Shortest path from 1 to 4 for Set 1:")
            print(GraphOperations.shortest_path(ds1, 1, 4))
            return ds1

        def set2():
            ds2 = DisjointSet()
            ds2.add_edge_undirected(1, 2)
            ds2.add_edge_undirected(2, 3)
            ds2.add_edge_undirected(3, 4)  # No cycle here

            print("Graph 2 has cycle:", ds2.cycle_detection())  # Expected: False

            print("BFS starting from vertex 1 for Set 2:")
            print(GraphOperations.bfs(ds2, 1))

            print("DFS starting from vertex 1 for Set 2:")
            print(GraphOperations.dfs(ds2, 1))

            print("Shortest path from 1 to 4 for Set 2:")
            print(GraphOperations.shortest_path(ds2, 1, 4))
            return ds2
        
        def DisjointSetOperations(ds1, ds2):
        
            # 🔹 First Disjoint Set (ds1)
            parent1 = {i: i for i in range(1, 6)}
            rank1   = {i: 0 for i in range(1, 6)}

            ds1.union(parent1, rank1, 1, 2)
            ds1.union(parent1, rank1, 2, 3)

            print("DS1 - Find 1:", ds1.find(parent1, 1))
            print("DS1 - Find 2:", ds1.find(parent1, 2))
            print("DS1 - Find 3:", ds1.find(parent1, 3))

            # 🔹 Second Disjoint Set (ds2)
            parent2 = {i: i for i in range(1, 6)}
            rank2   = {i: 0 for i in range(1, 6)}

            ds2.union(parent2, rank2, 4, 5)

            print("DS2 - Find 4:", ds2.find(parent2, 4))
            print("DS2 - Find 5:", ds2.find(parent2, 5))

            # 🔹 Now connect sets across ds1 using its own parent
            ds1.union(parent1, rank1, 3, 4)

            print("DS1 - After union of sets containing 3 and 4:")
            print("DS1 - Find 1:", ds1.find(parent1, 1))
            print("DS1 - Find 5:", ds1.find(parent1, 5))

        ds1 = set1()   # Create only once
        print("\n")

        ds2 = set2()   # Create only once
        print("\n")
        DisjointSetOperations(ds1, ds2)  # Pass the SAME ds1, ds2
        print("\n")

    main()