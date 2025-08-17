import threading
import time

def boil_water():
    print("Chef 1: Boiling water...")
    time.sleep(3)
    print("Chef 1: Water boiled!")

def chop_vegetables():
    print("Chef 2: Chopping vegetables...")
    time.sleep(2)
    print("Chef 2: Vegetables chopped!")

def bake_cake():
    print("Chef 3: Baking cake...")
    time.sleep(4)
    print("Chef 3: Cake baked!")

# Create threads for each task
t1 = threading.Thread(target=boil_water)
t2 = threading.Thread(target=chop_vegetables)
t3 = threading.Thread(target=bake_cake)

# Start threads
t1.start()
t2.start()
t3.start()

# Wait for all threads to finish
t1.join()
t2.join()
t3.join()

print("All tasks done!")