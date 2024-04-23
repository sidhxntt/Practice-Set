const getcheese = () => {
    const cheese = '🧀';
    return cheese;
};

const getdough = (cheese) => {
    const dough = cheese + '🍩'; // corrected variable reference
    return dough;
};

const getpizza = (dough) => {
    const pizza = dough + '🍕'; // corrected variable reference
    return pizza;
};
let c=getcheese();
console.log("Here is the cheese:", c);
console.log("Now we add some dough to it:", getdough(getcheese())); // corrected function call
console.log("And finally, a delicious Pizza!", getpizza(getdough(getcheese()))); // corrected function call
