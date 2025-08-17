from multiprocessing import Process
import time

def boil_water():
    time.sleep(2)
    print("Water boiled!")

def chop_vegetables():
    time.sleep(1)
    print("Vegetables chopped!")

def bake_cake():
    time.sleep(3)
    print("Cake baked!")

if __name__ == "__main__":
    # Each process is like a separate kitchen
    p1 = Process(target=boil_water)
    p2 = Process(target=chop_vegetables)
    p3 = Process(target=bake_cake)

    p1.start()
    p2.start()
    p3.start()

    p1.join()
    p2.join()
    p3.join()

    print("All tasks done in separate kitchens!")