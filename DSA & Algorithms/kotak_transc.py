class JanuaryCost:
    def __init__(self, cost):
        self.cost = cost

    def total_cost(self):
        total = 0
        for value in self.cost.values():
            if isinstance(value, list):
                total += sum(value)
            else:
                total += value
        return total


cost = {
    "rent": 8681,
    "mom": 5000,
    "hathaway": 2500,
    "potien": 6254,
    "rohan": 2280,
    "bike battery": 2700,
    "hair salon": 450,
    "lenskart": 6039,
    "torque": 955,
    "others": [142, 500, 386, 400, 818, 230, 206, 238, 149, 100, 250, 282, 213, 70, 340, 539, 858, 187, 807, 700, 700, 500, 142, 386]
}

january = JanuaryCost(cost)
total = january.total_cost()

print("Total cost is:", total)

limit = 50000
print("How much i can afford:", limit - total)
print("Spent EMI for 12 months:", total / 12)
print("Limit EMI for 12 months:", limit / 12)
