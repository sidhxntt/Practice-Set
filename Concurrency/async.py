import asyncio

async def boil_water():
    print("Boiling water...")
    await asyncio.sleep(3)  # Non-blocking sleep
    print("Water boiled!")

async def chop_vegetables():
    print("Chopping vegetables...")
    await asyncio.sleep(2)  # Non-blocking sleep
    print("Vegetables chopped!")

async def bake_cake():
    print("Baking cake...")
    await asyncio.sleep(4)  # Non-blocking sleep
    print("Cake baked!")

async def main():
    # Run all tasks concurrently
    await asyncio.gather(
        boil_water(),
        chop_vegetables(),
        bake_cake()
    )
    print("All tasks done!")

# Entry point
asyncio.run(main())
