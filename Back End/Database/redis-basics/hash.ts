import rc from "./client";
const data = {
    backend: {
      language: ["Python", "Typescript", "Go", "Rust"],
      framework: ["Django", "Express", "FastAPI", "Flask"],
    },
    frontend: {
      language: ["Javascript", "Typescript", "JSX"],
      framework: ["React", "Angular", "Vue"],
    },
    database: {
      language: ["SQL", "NoSQL"],
      framework: ["PostgreSQL", "MongoDB"],
    },
  };

async function multipleSettingAndGetting() {
  async function setValues() {
    try {
    
      // Serialize the complex object to JSON strings for each field
      const result = await rc.hset("Tech:programming", {
        backend: JSON.stringify(data.backend),
        frontend: JSON.stringify(data.frontend),
        database: JSON.stringify(data.database),
      });

      console.log(`HASH Result:`, result);
    } catch (error) {
      console.error(`Error setting values:`, error);
    }
  }
  await setValues();

  async function logging() {
    try {
      const hash = await rc.hgetall("Tech:programming");

      // Deserialize the JSON strings back to objects
      const parsedHash = Object.fromEntries(
        Object.entries(hash).map(([key, value]) => [key, JSON.parse(value)])
      );

      console.log("HASH:", parsedHash);

    //   const backendField = await rc.hget("Tech:programming", "backend");
    //   const valuesOfBackendField = JSON.parse(backendField);
    //   console.log("Backend field Values:", valuesOfBackendField);

      const backendExists = await rc.hexists("Tech:programming", "backend");
      console.log("Backend Exists?:", backendExists);

      const hashKeys = await rc.hkeys("Tech:programming");
      console.log("HASH KEYS ONLY:", hashKeys);

      const hashLen = await rc.hlen("Tech:programming");
      console.log("HASH LENGTH:", hashLen);

      const hashFieldLen = await rc.hstrlen("Tech:programming", "frontend");
      console.log("Frontend Field String Length:", hashFieldLen);

    } catch (error) {
      console.error(`Error getting values:`, error);
    }
  }

  await logging();
}

multipleSettingAndGetting();