from trees import Node
from BST import BST

# AVL Trees are a self-balancing form of Binary Search Trees (BSTs).
# They maintain a balance factor for each node to ensure that the tree remains approximately balanced,
# which guarantees O(log n) time complexity for search, insertion, and deletion operations.

class AVLTree(BST):
    def __init__(self, root):
        super().__init__(root)
    
    def insert(self, node, key):
        if node is None:
            return Node(key)
        if key < node.key:
            node.left = self.insert(node.left, key)
        elif key > node.key:
            node.right = self.insert(node.right, key)
        else:
            return node

        # Update the balance factor and balance the tree
        return self.balance_tree(node)

    def balance_tree(self, node):
        balance_factor = self.get_balance_factor(node)
        if balance_factor > 1:
            if self.get_balance_factor(node.left) < 0:
                node.left = self.rotate_left(node.left)
            return self.rotate_right(node)
        if balance_factor < -1:
            if self.get_balance_factor(node.right) > 0:
                node.right = self.rotate_right(node.right)
            return self.rotate_left(node)
        return node

    def get_balance_factor(self, node):
        # Get the balance factor of a node ie height(left subtree) - height(right subtree)
        if node is None:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)

    def get_height(self, node):
        if node is None:
            return 0
        left_height = self.get_height(node.left)
        right_height = self.get_height(node.right)
        return 1 + max(left_height, right_height)

    def rotate_left(self, z):
        y = z.right
        T2 = y.left
        y.left = z
        z.right = T2
        return y

    def rotate_right(self, z):
        y = z.left
        T3 = y.right
        y.right = z
        z.left = T3
        return y
    
    def check_avl(self, node):
        if node is None:
            return True
        balance_factor = self.get_balance_factor(node)
        if abs(balance_factor) > 1:
            return False
        return self.check_avl(node.left) and self.check_avl(node.right)
    
    def delete(self, node, key):
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
            temp = super().min_value_node(node.right)
            node.key = temp.key
            node.right = self.delete(node.right, temp.key)

        return self.balance_tree(node)

# Example usage:
if __name__ == "__main__":
    avl = AVLTree(10)
    avl.insert(avl.root, 5)
    avl.insert(avl.root, 15)
    avl.insert(avl.root, 3)
    avl.insert(avl.root, 7)
    avl.insert(avl.root, 12)
    avl.insert(avl.root, 18)

    print("Inorder traversal of AVL Tree:", avl.inorder(avl.root))
    print("Height of AVL Tree:", avl.get_height(avl.root))
    print("Balance factor of root:", avl.get_balance_factor(avl.root))
    print("Is the tree a valid AVL Tree?", avl.check_avl(avl.root))
    avl.delete(avl.root, 5)
    print("Inorder traversal after deleting 5:", avl.inorder(avl.root))
    print("Is the tree a valid AVL Tree after deletion?", avl.check_avl(avl.root))