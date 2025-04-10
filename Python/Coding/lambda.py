
name_asking = lambda: input("What is your name? ")

age_asking = lambda: (age := input("What's your age? ")) and (
    print("Oh, you're an adult") if int(age) > 18 else print("Still a child eh :(")
) or age

display = lambda name, age: print(f"So your name is {name} & your age is {age}")

main = lambda: display(name_asking(), age_asking())

main()