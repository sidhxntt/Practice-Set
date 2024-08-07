const crypto = require("crypto");
const HashStore = require("../models/HashStore_schema");

const optimization_for_feeding_data = async (data, Hashname ,collection, name) => {
  const newHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");

  try {
    const existingHashDoc = await HashStore.findOne({
      name: Hashname,
    });
    if (existingHashDoc && existingHashDoc.hash === newHash) {
      console.log(`${name} has not changed.`);
      return;
    }

    if (existingHashDoc) {
      await collection.deleteMany({});
      console.log(`${name} data deleted.`);
    }

    await collection.insertMany(data);
    console.log(`${name} inserted (new).`);

    if (existingHashDoc) {
      existingHashDoc.hash = newHash;
      await existingHashDoc.save();
    } else {
      await HashStore.create({ name: Hashname, hash: newHash });
    }

    console.log("Hash updated.");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = optimization_for_feeding_data;
