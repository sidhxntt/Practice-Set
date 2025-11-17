🥞 How count_down Uses the Stack Internally

def count_down(self, n):
    if n == 0:
        print("Blastoff!")
    else:
        print(n)
        time.sleep(1)
        self.count_down(n-1)


⸻

🥞 What Is a Call Stack?

Think of the call stack like a pile of plates:
	•	A new plate goes on top
	•	You always remove the plate from the top
	•	Last plate added = first plate removed
(LIFO → Last In, First Out)

Every time a function is called, Python creates a stack frame and places it on this stack.

⸻

🎬 Step-by-Step: What Happens When You Call count_down(3)

Below is exactly what Python does internally.

⸻

⭐ Step 1 — count_down(3) is called

Python creates a new stack frame:

[ count_down(3) ]  <- top

It prints 3, waits 1 second, then calls count_down(2).

⸻

⭐ Step 2 — count_down(2) is called

Stack becomes:

[ count_down(3) ]
[ count_down(2) ]  <- top

It prints 2, waits, then calls count_down(1).

⸻

⭐ Step 3 — count_down(1) is called

Stack becomes:

[ count_down(3) ]
[ count_down(2) ]
[ count_down(1) ]  <- top

It prints 1, waits, then calls count_down(0).

⸻

⭐ Step 4 — count_down(0) is called

Stack becomes:

[ count_down(3) ]
[ count_down(2) ]
[ count_down(1) ]
[ count_down(0) ]  <- top

This time:

print("Blastoff!")

No recursive call is made.
So the stack begins to unwind.

⸻

🔄 Stack Unwinding (Returning Back Up)

When a function finishes, Python removes its frame from the stack.
	1.	count_down(0) finishes → pop
	2.	count_down(1) finishes → pop
	3.	count_down(2) finishes → pop
	4.	count_down(3) finishes → pop

Stack becomes empty:

[ empty stack ]


⸻

🎯 Key Idea

Each recursive call pauses the previous function and places a new one on top of the stack.

This line:

self.count_down(n-1)

actually means:

👉 “Pause this function,
run a new version of this function,
and continue only when the new one finishes.”

⸻

🔥 Why Deep Recursion Can Crash

If recursion goes too deep, Python keeps adding stack frames until the stack is full.
This causes:

RecursionError: maximum recursion depth exceeded


⸻

🧠 Final Summary
	•	Every recursive call creates a stack frame
	•	Frames are placed in a call stack (LIFO)
	•	The top frame is always the currently running one
	•	When recursion ends, the stack unwinds
	•	Recursion = “go deeper → then come back up”

⸻

