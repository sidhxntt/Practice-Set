import rc from "./client";

async function ListSettingAndGetting() {
  // Function to set multiple key-value pairs using MSET.
  async function setValues() {
    try {
      // MSET allows setting multiple key-value pairs at once.
      const result = await rc.lpush( "authors:names",
        "sid",
        "pri",
        "puru",
        "shashank",
        "arav"
      );
      console.log(`LPUSH Result:`, result);
    } catch (error) {
      console.error(`Error setting values:`, error);
    }
  }
  await setValues();
  async function logging() {
    const list = await rc.lrange("authors:names", 0, 5);
    console.log("LIST:", list);

    const length_of_list = await rc.llen("authors:names");
    console.log("LENGTH:", length_of_list);

    const first_element = await rc.lpop("authors:names");
    console.log("first element:", first_element);

    const last_element = await rc.rpop("authors:names");
    console.log("last element:", last_element);

    const sub_list = await rc.ltrim("authors:names", 0, 1);
    console.log(sub_list);

    const sub_list_range = await rc.lrange("authors:names", 0, 5);
    console.log("SUB LIST:", sub_list_range);

    const right_push = await rc.rpush("authors:names", "aastha");
    console.log("RIGHT PUSH:", right_push);

    const left_push = await rc.lpush("authors:names", "madhav");
    console.log("RIGHT PUSH:", left_push);

    const final_list_range = await rc.lrange("authors:names", 0, -1);
    console.log("SUB LIST:", final_list_range);
  }
  logging();
}

ListSettingAndGetting();
