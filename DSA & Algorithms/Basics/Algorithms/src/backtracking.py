class BackTracking:
    def __init__(self):
        pass

    def N_queens(self, n):
        def is_not_under_attack(row, col):
            for prev_row in range(row):
                if (board[prev_row] == col or
                    board[prev_row] - prev_row == col - row or
                    board[prev_row] + prev_row == col + row):
                    return False
            return True

        def place_queen(row):
            if row == n:
                result.append(board[:])
                return
            for col in range(n):
                if is_not_under_attack(row, col):
                    board[row] = col
                    place_queen(row + 1)
                    board[row] = -1  # backtrack

        result = []
        board = [-1] * n
        place_queen(0)
        return result

    def solve_sudoku(self, board):
        def is_valid(num, row, col):
            for i in range(9):
                if board[row][i] == num or board[i][col] == num:
                    return False
            start_row, start_col = 3 * (row // 3), 3 * (col // 3)
            for i in range(3):
                for j in range(3):
                    if board[start_row + i][start_col + j] == num:
                        return False
            return True

        def solve():
            for i in range(9):
                for j in range(9):
                    if board[i][j] == 0:
                        for num in range(1, 10):
                            if is_valid(num, i, j):
                                board[i][j] = num
                                if solve():
                                    return True
                                board[i][j] = 0  # backtrack
                        return False
            return True

        solve()
        return board