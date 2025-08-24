class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def prepend(self, data):
        new_node = Node(data)

        if not self.head:
            self.head = new_node
            return
        new_node.next = self.head
        self.head = new_node

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        last = self.head
        while(last.next):
            last = last.next
        last.next = new_node

    def delete(self, key):
        temp = self.head

        # case 1 when head.data == key
        if temp and temp.data == key:
            self.head = temp.next 
            temp = None
            return
        
        # case 2 when head.data != key
        prev = None
        while temp and temp!=key:
            prev = temp
            temp = temp.next

        if temp.next is None:
            return
        
        prev.next = temp.next
        temp = None
