async function weather() {
  try {
    const DelhiWeather = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("27 Degrees");
      }, 3000);
    });
    const BangaloreWeather = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("21 Degrees");
      }, 4000);
    });
    const MumbaiWeather = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("20 Degrees");
      }, 5000);
    });
    const KolkataWeather = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("30 Degrees");
      }, 6000);
    });
    console.log("Fetching data for Delhi...");
    console.log(`Delhi Weather: ${await DelhiWeather}\n`);
    console.log("Fetching data for Bangalore...");
    console.log(`Bangalore Weather: ${await BangaloreWeather}\n`);
    console.log("Fetching data for Mumbai...");
    console.log(`Mumbai Weather: ${await MumbaiWeather}\n`);
    console.log("Fetching data for Kolkata...");
    console.log(`Kolkata Weather: ${await KolkataWeather}\n`);
  } catch (error) {
    console.log(error.message);
  }
}

weather();
