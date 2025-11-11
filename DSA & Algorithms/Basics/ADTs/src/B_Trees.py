# B-Trees also known as 2-3 Trees
# Each node can have at most 2 keys and 3 children (2-node or 3-node)
# Keys in a node are always sorted: key1 < key2 when key2 exists
# All leaves appear at the same level (perfectly balanced tree)
# B-Trees are height-balanced (no skew like in BSTs)
# Unlike BSTs which grow downward (becoming tall), B-Trees grow sideways by storing more keys per node
# This wide-growth property makes B-Trees efficient for storage systems that read/write large blocks of data
# Conditions for a 2-3 Tree (B-Tree of order 3):
#   key1 < key2
#   left child   < key1
#   middle child between key1 and key2 (if key2 exists)
#   right child  > key2

class Node:
    def __init__(self, key1, key2=None):
        self.key1 = key1
        self.key2 = key2
        self.left = None
        self.right = None
        self.middle = None

class BTree:
    def __init__(self, root_key):
        self.root = Node(root_key)

    # Inorder Traversal (Left subtree → key1 → Middle subtree + key2 → Right subtree)
    def inorder(self, node):
        if not node:
            return []
        return (
            self.inorder(node.left)
            + [node.key1]
            + (self.inorder(node.middle) + [node.key2] if node.key2 is not None else [])
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
            node.middle = self._insert(node.middle, key)
        else:
            node.right = self._insert(node.right, key)
        return node
    
    def search(self, node, key):
        if not node:
            return False
        if key == node.key1 or key == node.key2:
            return True
        elif key < node.key1:
            return self.search(node.left, key)
        elif node.key2 is None or key < node.key2:
            return self.search(node.middle, key)
        else:
            return self.search(node.right, key)
        
    def find_min(self, node):
        current = node
        while current.left:
            current = current.left
        return current.key1
    
    def find_max(self, node):
        current = node
        while current.right:
            current = current.right
        if current.key2 is not None:
            return current.key2
        return current.key1
    
    def height(self, node):
        if not node:
            return 0
        left_height = self.height(node.left)
        middle_height = self.height(node.middle)
        right_height = self.height(node.right)
        return 1 + max(left_height, middle_height, right_height)
    
    def count_nodes(self, node):
        if not node:
            return 0
        return 1 + self.count_nodes(node.left) + self.count_nodes(node.middle) + self.count_nodes(node.right)
    
    def count_leaves(self, node):
        if not node:
            return 0
        if not node.left and not node.middle and not node.right:
            return 1
        return self.count_leaves(node.left) + self.count_leaves(node.middle) + self.count_leaves(node.right)
    
    def delete(self, node, key):
        # Deletion in B-Trees is complex and requires handling multiple cases
        # This is a placeholder for the delete operation
        pass

# Example usage:
if __name__ == "__main__":
    b_tree = BTree(10)
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