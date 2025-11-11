# B-Trees also known as 2-3-4 Trees
# Each node can have at most 3 keys and 4 children
# Keys in a node are always sorted (key1 < key2 < key3)
# All leaves are at the same level, making the tree perfectly balanced
# B-Trees grow in width (sideways) instead of height; BSTs grow downward and can become skewed
# This wide-growth property makes B-Trees ideal for disks/databases that read large blocks of data at once
# Conditions for a 2-3-4 Tree (B-Tree of order 4): 
#   key1 < key2 < key3
#   left child  < key1
#   middle child1 between key1 and key2 (if key2 exists)
#   middle child2 between key2 and key3 (if key3 exists)
#   right child > key3

class Node:
    def __init__(self, key1, key2=None, key3=None):
        self.key1 = key1
        self.key2 = key2
        self.key3 = key3
        self.middle1 = None
        self.middle2 = None
        self.left = None
        self.right = None


class BPlusTree:
    def __init__(self, root_key):
        self.root = Node(root_key)

    # Inorder Traversal (Left subtree → key1 → Middle1 subtree → key2 → Middle2 subtree → key3 → Right subtree)
    def inorder(self, node):
        if not node:
            return []
        return (
            self.inorder(node.left)
            + [node.key1]
            + (self.inorder(node.middle1) + [node.key2] if node.key2 is not None else [])
            + (self.inorder(node.middle2) + [node.key3] if node.key3 is not None else [])
            + self.inorder(node.right)
        )
        

    def insert(self, key):
        if not self.root:
            self.root = Node(key)
        else:
            self._insert(self.root, key)

    def _insert(self, node, key):
        if not node:
            return Node(key)
        if key < node.key1:
            node.left = self._insert(node.left, key)
        elif node.key2 is None or key < node.key2:
            node.middle1 = self._insert(node.middle1, key)
        elif node.key3 is None or key < node.key3:
            node.middle2 = self._insert(node.middle2, key)
        else:
            node.right = self._insert(node.right, key)
        return node
    
    def search(self, node, key):
        if not node:
            return False
        if key == node.key1 or key == node.key2 or key == node.key3:
            return True
        elif key < node.key1:
            return self.search(node.left, key)
        elif node.key2 is None or key < node.key2:
            return self.search(node.middle1, key)
        elif node.key3 is None or key < node.key3:
            return self.search(node.middle2, key)
        else:
            return self.search(node.right, key)
        
# Example usage:
if __name__ == "__main__":
    b_tree = BPlusTree(10)
    b_tree.insert(5)
    b_tree.insert(15)
    b_tree.insert(3)
    b_tree.insert(7)
    b_tree.insert(12)
    b_tree.insert(18)

    print("Inorder traversal of B-Tree:", b_tree.inorder(b_tree.root))
    print("Height of B-Tree:", b_tree.height(b_tree.root))
    print("Number of nodes:", b_tree.count_nodes(b_tree.root))
    print("Number of leaves:", b_tree.count_leaves(b_tree.root))
    # Note: Delete operation is not yet implemented
    print("Searching for 7:", b_tree.search(b_tree.root, 7))
    print("Searching for 100:", b_tree.search(b_tree.root, 100))