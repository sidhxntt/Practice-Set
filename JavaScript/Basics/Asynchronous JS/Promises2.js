const getcheese = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cheese = "🧀";
        resolve(cheese);
      }, 2000);
    });
  };
const getdough = (cheese) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dough = cheese + "🍩";
        resolve(dough); // Changed from resolve(cheese) to resolve(dough)
      }, 2000);
    });
  };
const getpizza = (dough) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pizza = dough + "🍕";
        resolve(pizza);
      }, 2000);
    });
  };
  
  getcheese()
    .then((cheese) => {
      console.log("Here is the cheese: ", cheese);
      return getdough(cheese); // Pass cheese to getdough function
    })
    .then((dough) => {
      console.log("Here is the dough: ", dough);
      return getpizza(dough); // Pass dough to getpizza function
    })
    .then((pizza) => {
      console.log("Here is the pizza: ", pizza);
    });
  