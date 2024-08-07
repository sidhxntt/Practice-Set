// sum.test.ts
import Operation from "./sum";

test('maths operations', () => { 
    const [sum, product] = Operation(1, 2, 3, 4, 5, 6);
    
    // Assert the results
    expect(sum).toBe(21); 
    expect(product).toBe(720); 
});