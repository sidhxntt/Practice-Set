cost = [142, 500,386, 2280, 400, 818, 206, 8681 , 5700, 5000, 2500, 238, 6254 ]
# 8681 rent, 5000 mom, 2500 hathaway, 5700 potien, 2280 rohan
sum =0
for i in range(len(cost)):
    sum = sum + cost[i]
print("Total cost is:", sum)
limit = 45000
print("How much i can afford:", limit - sum)
print(" spent EMI for 12 months:", sum/12)
print(" limit EMI for 12 months:", limit/12)
    