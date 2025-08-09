class Solution(object):
    def maxProfit(self, prices):
        profit = 0
        buy = prices[0]
        for sell in prices[1:]:
            if sell > buy:
                profit = max(profit, sell-buy)
            else:
                buy = sell

        return profit   

s = Solution()    

prices = [7,1,5,3,6,4]
print(s.maxProfit(prices))
