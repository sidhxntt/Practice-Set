from trees import BinaryTree, Node

# BSTs are a specialized form of Binary Trees with specific ordering properties.
# Left subtree contains nodes with keys less than the parent node's key.
# Right subtree contains nodes with keys greater than the parent node's key.
# No duplicate nodes are allowed in a standard BST.
# This property enables efficient searching, insertion, and deletion operations.
# Inorder traversal of a BST yields sorted order of keys.

class BST(BinaryTree):
    def __init__(self, root):
        super().__init__(root)
    
    def check_bst(self, node):
        list = super().inorder(node)
        for i in range(1, len(list)):
            if list[i] <= list[i-1]:
                return False
        return True

    def insert(self, node, key):
        if node is None:
            return Node(key)
        if key < node.key:
            node.left = self.insert(node.left, key)
        elif key > node.key:
            node.right = self.insert(node.right, key)
        return node
    
    def delete(self, node, key):
        # when deleting a node, 3 cases arise:
        # 1. Node to be deleted is a leaf node (no children) and if so, simply remove it
        # 2. Node to be deleted has one child and if so, bypass the node
        # 3. Node to be deleted has two children and if so, find inorder successor (smallest in the right subtree) or inorder predecessor (largest in the left subtree)
        if node is None:
            return node
        if key < node.key:
            node.left = self.delete(node.left, key)
        elif key > node.key:
            node.right = self.delete(node.right, key)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            temp = self.min_value_node(node.right)
            node.key = temp.key
            node.right = self.delete(node.right, temp.key)
        return node

    def search(self, node, key):
        if node is None or node.key == key:
            return node
        if key < node.key:
            return self.search(node.left, key)
        return self.search(node.right, key)
    
    def min_value_node(self, node):
        current = node
        while current.left is not None:
            current = current.left
        return current

    def max_value_node(self, node):
        current = node
        while current.right is not None:
            current = current.right
        return current
    
# Example usage:
if __name__ == "__main__":
    bst = BST(10) # Root node
    keys = [5, 15, 3, 7, 12, 18]
    for key in keys:
        bst.insert(bst.root, key)
    bst.insert(bst.root, 18)

    print("Inorder traversal of BST:", bst.inorder(bst.root))

    print("Search for 7:", bst.search(bst.root, 7) is not None)
    print("Search for 20:", bst.search(bst.root, 20) is not None)

    print("Minimum value in BST:", bst.min_value_node(bst.root).key)
    print("Maximum value in BST:", bst.max_value_node(bst.root).key)

    bst.delete(bst.root, 5)
    print("Inorder traversal after deleting 5:", bst.inorder(bst.root))

    print("Is the tree a valid BST?", bst.check_bst(bst.root))