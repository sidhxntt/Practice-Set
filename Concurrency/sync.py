import time

def boil_water():
    print("Boiling water...")
    time.sleep(3)  # Blocks the thread for 3 seconds
    print("Water boiled!")

def chop_vegetables():
    print("Chopping vegetables...")
    time.sleep(2)  # Blocks the thread for 2 seconds
    print("Vegetables chopped!")

def bake_cake():
    print("Baking cake...")
    time.sleep(4)  # Blocks the thread for 4 seconds
    print("Cake baked!")

# Single-threaded execution
boil_water()
chop_vegetables()
bake_cake()

print("All tasks done!")