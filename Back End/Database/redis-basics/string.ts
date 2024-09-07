import rc from "./client";

async function singleSettingAndGetting() {
  // Function to set values with the specified key, value, and lock option.
  async function setValues(key: string, value: string | number) {
    try {
      const result = await rc.setnx(key, value);
      console.log(`Set Result for ${key}:`, result);
    } catch (error) {
      console.error(`Error setting value for ${key}:`, error);
    }
  }

  // Function to get values for the specified key.
  async function getValues(key: string) {
    try {
      const result = await rc.get(key);
      console.log(`Get Result for ${key}:`, result);
    } catch (error) {
      console.error(`Error getting value for ${key}:`, error);
    }
  }

  // Set values in parallel
  await Promise.all([
    setValues("users:name:sid", "Siddhant"), // folder structure -> users->name->sid = Siddhant
    setValues("users:name:pri", "Priyanka"),
  ]);

  // Get values
  await getValues("users:name:sid");
  await getValues("users:name:pri");
}

async function multipleSettingAndGetting() {
  // Function to set multiple key-value pairs using MSET.
  async function setValues() {
    try {
      // MSET allows setting multiple key-value pairs at once.
      const result = await rc.msetnx(
        "bikes:id:1", "renolds", 
        "bikes:id:2", "obscient", 
        "bikes:id:3", "ecliplse",
      );
      console.log(`MSET Result:`, result); 
    } catch (error) {
      console.error(`Error setting values:`, error);
    }
  }

  // Function to get multiple values using MGET.
  async function getValues(keys: string[]) {
    try {
      // MGET allows retrieving multiple values at once.
      const results = await rc.mget(...keys);
      keys.forEach((key, index) => {
        console.log(`Get Result for ${key}:`, results[index]);
      });
    } catch (error) {
      console.error(`Error getting values:`, error);
    }
  }

  // Set multiple values
  await setValues();

  // Get multiple values
  await getValues(["bikes:id:1", "bikes:id:2", "bikes:id:3"]);
}



singleSettingAndGetting();
multipleSettingAndGetting();