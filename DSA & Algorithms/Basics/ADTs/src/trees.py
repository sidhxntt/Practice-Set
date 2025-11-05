# can be represent using both linked list (doubly ll) and array
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
        if node:
            self.inorder(node.left)
            print(node.key, end=" ")
            self.inorder(node.right)
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
        if node:
            print(node.key, end=" ")
            self.preorder(node.left)
            self.preorder(node.right)

    # Postorder Traversal (Left → Right → Root)
    def postorder(self, node):
        if node:
            self.postorder(node.left)
            self.postorder(node.right)
            print(node.key, end=" ")

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
    tree.inorder(tree.root)

    print("\nPreorder traversal: ", end="")
    tree.preorder(tree.root)
    
    print("\nPostorder traversal: ", end="")
    tree.postorder(tree.root)

    print("\nNumber of nodes:", tree.count_nodes(tree.root))
    print("Height of tree:", tree.height(tree.root))

