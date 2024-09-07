import rc from "./client";

async function Sets_SettingAndGetting() {
  // Function to set multiple key-value pairs using MSET.
  async function setValues() {
    try {
      // MSET allows setting multiple key-value pairs at once.
      const result = await rc.sadd( "cars:names",
        "porche",
        "farari",
        "gt",
        "merc",
        "bmw"
      );
      console.log(`SADD Result:`, result);
    } catch (error) {
      console.error(`Error setting values:`, error);
    }
  }
  await setValues();

  async function logging() {
    const size = await rc.scard("cars:names");
    console.log("SET size:", size);

    const is_member= await rc.sismember("cars:names","bmw");
    console.log("is_member:", is_member);
  }
  logging()
}

Sets_SettingAndGetting();
