from utils.displayer import logger, Displayer

class Matrix(Displayer):

    # Diagonal Matrix → 1D
    def diag_matrix_to_1D(self, matrix: list[list[int]]):
        n, m = len(matrix), len(matrix[0])
        diag = [matrix[i][j] for i in range(n) for j in range(m) if i == j]
        logger.info(f"Converted Diagonal Matrix to 1D: {diag}")
        return diag

    # Lower Triangular Matrix → 1D
    def lower_triangular_matrix_to_1D(self, matrix: list[list[int]]):
        n, m = len(matrix), len(matrix[0])
        lower = [matrix[i][j] for i in range(n) for j in range(m) if i >= j]
        logger.info(f"Converted Lower Triangular Matrix to 1D: {lower}")
        return lower

    # Upper Triangular Matrix → 1D
    def upper_triangular_matrix_to_1D(self, matrix: list[list[int]]):
        n, m = len(matrix), len(matrix[0])
        upper = [matrix[i][j] for i in range(n) for j in range(m) if i <= j]
        logger.info(f"Converted Upper Triangular Matrix to 1D: {upper}")
        return upper

    # Symmetric Matrix → 1D (upper triangle form)
    def symmetric_matrix_to_1D(self, matrix: list[list[int]]):
        n = len(matrix)
        for i in range(n):
            for j in range(n):
                if matrix[i][j] != matrix[j][i]:
                    logger.error("Matrix is not symmetric")
                    return None
        upper = [matrix[i][j] for i in range(n) for j in range(n) if i <= j]
        logger.info(f"Converted Symmetric Matrix to 1D: {upper}")
        return upper

    # Tri-Band Matrix → 1D
    def tri_band_matrix_to_1D(self, matrix: list[list[int]]):
        n, m = len(matrix), len(matrix[0])
        band = [matrix[i][j] for i in range(n) for j in range(m) if abs(i - j) <= 1]
        logger.info(f"Converted Tri Band Matrix to 1D: {band}")
        return band

    # Toeplitz Matrix → 1D
    def toeplitz_matrix_to_1D(self, matrix: list[list[int]]):
        n = len(matrix)
        one_d = matrix[0] + [matrix[i][0] for i in range(1, n)]
        logger.info(f"Converted Toeplitz Matrix to 1D: {one_d}")
        return one_d

    # Sparse Matrix → COO
    def sparse_matrix_to_COO(self, matrix: list[list[int]]):
        n, m = len(matrix), len(matrix[0])
        rows, cols, values = zip(*[
            (i, j, matrix[i][j])
            for i in range(n)
            for j in range(m)
            if matrix[i][j] != 0
        ]) if any(matrix[i][j] != 0 for i in range(n) for j in range(m)) else ([], [], [])

        rows, cols, values = list(rows), list(cols), list(values)
        logger.info(f"COO Representation -> Rows: {rows}, Cols: {cols}, Values: {values}")
        return rows, cols, values

    # Matrix Arithmetic
    def matrix_arithmetic(self, matrix1: list[list[int]], matrix2: list[list[int]]):
        n1, m1 = len(matrix1), len(matrix1[0])
        n2, m2 = len(matrix2), len(matrix2[0])

        if (n1, m1) != (n2, m2):
            raise ValueError("Matrices must have the same dimensions for addition and subtraction")

        add = [[matrix1[i][j] + matrix2[i][j] for j in range(m1)] for i in range(n1)]
        sub = [[matrix1[i][j] - matrix2[i][j] for j in range(m1)] for i in range(n1)]

        mul = None
        if m1 == n2:
            mul = [
                [sum(matrix1[i][k] * matrix2[k][j] for k in range(m1)) for j in range(m2)]
                for i in range(n1)
            ]
        logger.info(f"Sum: {add}")
        logger.info(f"Difference: {sub}")
        logger.info(f"Product: {mul}")
        return {"add": add, "sub": sub, "mul": mul}


class Polynomials(Matrix):
    """
    Store coefficients in increasing order of powers of x.
    P(x)=4+3x+2x^2+5x^3 is represented as: [4, 3, 2, 5]
    """

    def evaluate(self, poly, x):
        add = sum(coeff * (x ** i) for i, coeff in enumerate(poly))
        logger.info(f"Polynomial {poly} evaluated at x={x}: {add}")
        return add

    def add(self, p1, p2):
        n = max(len(p1), len(p2))
        result = [0] * n
        for i in range(n):
            result[i] = (p1[i] if i < len(p1) else 0) + (p2[i] if i < len(p2) else 0)
        logger.info(f"Added Polynomials: {result}")
        return result


if __name__ == "__main__":
    m = Matrix()
    p = Polynomials()

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
    tri_band_matrix = [
        [4, 8, 0, 0, 0],
        [1, 5, 9, 0, 0],
        [0, 3, 6, 5, 0],
        [0, 0, 4, 7, 1],
        [0, 0, 0, 2, 9]
    ]
    toeplitz_matrix = [
        [1, 2, 3, 4],
        [5, 1, 2, 3],
        [6, 5, 1, 2],
        [7, 6, 5, 1]
    ]
    sparse_matrix = [
        [0, 0, 3, 0, 4],
        [0, 0, 5, 7, 0],
        [0, 0, 0, 0, 0],
        [0, 2, 6, 0, 0]
    ]

    pol1 = [4, 3, 2, 5]
    pol2 = [1, 2, 3, 4]

    m.diag_matrix_to_1D(diag_matrix)
    m.lower_triangular_matrix_to_1D(lower_triangular_matrix)
    m.upper_triangular_matrix_to_1D(upper_triangular_matrix)
    m.symmetric_matrix_to_1D(symmetric_matrix)
    m.tri_band_matrix_to_1D(tri_band_matrix)
    m.toeplitz_matrix_to_1D(toeplitz_matrix)
    m.sparse_matrix_to_COO(sparse_matrix)
    m.matrix_arithmetic(lower_triangular_matrix, upper_triangular_matrix)

    p.evaluate(pol1, 2)
    p.add(pol1, pol2)
