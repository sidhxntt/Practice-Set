from utils.displayer import logger, Displayer

class Matrix(Displayer):

    def full_grid(self, arr:list):
        n = len(arr)
        grid = [arr[i][j] for i in range(n) for j in range(n)]
        logger.info(f"Full Grid: {grid}")

    def diag_matrix_to_1D(self, matrix: list[list[int]]):
        n = len(matrix)
        diag = [matrix[i][j] for i in range(n) for j in range(n) if i == j]
        logger.info(f"Converted Diagnoal Matrix to 1D: {diag}")
        return diag
    
    def lower_triangular_matrix_to_1D(self, matrix: list[list[int]]):
        n = len(matrix)
        lower = [matrix[i][j] for i in range(n) for j in range(n) if i >= j]
        logger.info(f"Converted Lower Triangular Matrix to 1D: {lower}")
        return lower
    
    def upper_triangular_matrix_to_1D(self, matrix: list[list[int]]):
        n = len(matrix)
        upper = [matrix[i][j] for i in range(n) for j in range(n) if i <= j]
        logger.info(f"Converted Upper Triangular Matrix to 1D: {upper}")
        return upper
    
    def symmetric_matrix_to_1D(self, matrix: list[list[int]]):
        n = len(matrix)
        for i in range(n):
            for j in range(n):
                if matrix[i][j] == matrix[j][i]:
                    upper = [matrix[i][j] for i in range(n) for j in range(n) if i <= j]
                    logger.info(f"Converted Symmetric Matrix to 1D: {upper}")
                    return True
            return False
        return 
    
        

if __name__ == "__main__":
    m = Matrix()

    diag_matrix = [
        [4, 0, 0, 0],
        [0, 5, 0, 0],
        [0, 0, 6, 0],
        [0, 0, 0, 7]
    ]
    lower_triangular_matrix = [
        [4, 0, 0, 0],
        [1, 5, 0, 0],
        [3, 8, 6, 0],
        [5, 9, 2, 7]
    ]
    upper_triangular_matrix = [
        [4, 9, 1, 4],
        [0, 5, 3, 9],
        [0, 0, 6, 2],
        [0, 0, 0, 7]
    ]
    symmetric_matrix = [
        [2, 2, 2, 2],
        [2, 3, 3, 3],
        [2, 3, 6, 6],
        [2, 3, 6, 7]
    ]

    arr = [1,4,3,0,9,8]
    operations = [
        ("Full Grid", m.full_grid, arr),
        ("Diagonal Matrix to 1D", m.diag_matrix_to_1D, diag_matrix),
        ("Lower Triangular Matrix to 1D", m.lower_triangular_matrix_to_1D, lower_triangular_matrix),
        ("Upper Triangular Matrix to 1D", m.upper_triangular_matrix_to_1D, upper_triangular_matrix),
        ("Symmetric Matrix to 1D (could be upper/lower triangular matrix in this case)", m.symmetric_matrix_to_1D, symmetric_matrix),
    ]

    Displayer.execute(operations)
#  [[4], [1, 5], [3, 8, 6], [5, 9, 2, 7]]