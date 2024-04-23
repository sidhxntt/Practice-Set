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
  //A way to write asynchronous piece of code in a synchronous way
async function makePizza() {
    try {
      console.log("Start making the pizza...");
      
      let cheese = await getcheese();
      console.log(`Adding ${cheese} to the dough.`);
      
      let dough = await getdough(cheese);
      console.log(`Mixing in some sauce and adding ${dough}`);
      
      let pizza = await getpizza(dough);
      console.log(`Here's your delicious Pizza! ${pizza}`);
    } catch (error) {
      console.log("Error: ", error)
    }
}
makePizza();