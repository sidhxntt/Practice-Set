# can be represent using both linked list (doubly ll) and array but mostly linked list is used
# Node class for the binary tree
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

# Binary Tree class
class BinaryTree:
    def __init__(self, root):
        self.root = Node(root)

    # Inorder Traversal (Left → Root → Right)
    def inorder(self, node):
        if not node:
            return []
        return self.inorder(node.left) + [node.key] + self.inorder(node.right)
          
    # inorder(1)
    # ├── inorder(2)
    # │    ├── inorder(4)
    # │    │    ├── inorder(None)   # returns
    # │    │    ├── print(4)
    # │    │    └── inorder(None)   # returns
    # │    │
    # │    ├── print(2)
    # │    └── inorder(5)
    # │         ├── inorder(None)   # returns
    # │         ├── print(5)
    # │         └── inorder(None)   # returns
    # │
    # ├── print(1)
    # └── inorder(3)
    #     ├── inorder(None)        # returns
    #     ├── print(3)
    #     └── inorder(None)        # returns


    # Preorder Traversal (Root → Left → Right)
    def preorder(self, node):
        if not node:
            return []
        return [node.key] + self.inorder(node.left) + self.inorder(node.right)

    # Postorder Traversal (Left → Right → Root)
    def postorder(self, node):
        if not node:
            return []
        return  self.inorder(node.left) + self.inorder(node.right) + [node.key]

    def count_nodes(self, node):
        if node is None:
            return 0
        else:
            return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)

    def height(self, node):
        if node is None:
            return 0
        else:
            left_height = self.height(node.left)
            right_height = self.height(node.right)
            return max(left_height, right_height) + 1
    

# Example usage:
if __name__ == "__main__":
    # Create a tree manually
    tree = BinaryTree(1)  # Root node
    tree.root.left = Node(2)
    tree.root.right = Node(3)
    tree.root.left.left = Node(4)
    tree.root.left.right = Node(5)

    print("Inorder traversal: ", end="")
    print(tree.inorder(tree.root))

    print("Preorder traversal: ", end="")
    print(tree.preorder(tree.root))

    print("Postorder traversal: ", end="")
    print(tree.postorder(tree.root))

    print("Number of nodes:", tree.count_nodes(tree.root))
    print("Height of tree:", tree.height(tree.root))

