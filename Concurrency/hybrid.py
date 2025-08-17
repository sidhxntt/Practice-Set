from multiprocessing import Process
import threading
import time

def chef_task(name, task):
    for i in range(2):
        print(f"{name} doing {task}")
        time.sleep(1)

def kitchen_process(kitchen_name):
    # Two threads (chefs) in this kitchen
    t1 = threading.Thread(target=chef_task, args=(f"{kitchen_name}-Chef1", "boiling water"))
    t2 = threading.Thread(target=chef_task, args=(f"{kitchen_name}-Chef2", "chopping vegetables"))

    t1.start()
    t2.start()

    t1.join()
    t2.join()
    print(f"{kitchen_name} finished all tasks!\n")

if __name__ == "__main__":
    # Two processes (kitchens)
    p1 = Process(target=kitchen_process, args=("Kitchen1",))
    p2 = Process(target=kitchen_process, args=("Kitchen2",))

    p1.start()
    p2.start()

    p1.join()
    p2.join()
    print("All kitchens done!")