interface ObjectType {
    name: string;
    age: number;
    address: string;
    hobbies: string[];
    gender: string;
    career: {
        profile: string;
        experience: number;
    };
    phone_number: number;
}

const sid_object: ObjectType = {
    name: "Siddhant",
    age: 22,
    address: "new delhi",
    hobbies: ["reading", "coding"],
    gender: "male",
    career: {
        profile: "software engineer",
        experience: 2,
    },
    phone_number: 8851728513
};

const puru_object: ObjectType = {
    name: "Prakuk",
    age: 22,
    address: "Spain",
    hobbies: ["roaming", "partying"],
    gender: "male",
    career: {
        profile: "Football coach",
        experience: 1,
    },
    phone_number: 8851728513
};

const pri_object: ObjectType = {
    name: "Priyanka",
    age: 22,
    address: "Bangalore",
    hobbies: ["eating", "sleeping"],
    gender: "Female",
    career: {
        profile: "Analyst",
        experience: 5,
    },
    phone_number: 123456778
};

const ObjectsFunction = (...args: ObjectType[]): void => {
    args.map(object => {
        greet(object.name, object.age);
    });
}

const greet = (name: string, age: number): void => {
    console.log(`Hello ${name} with age: ${age}`);
}

ObjectsFunction(sid_object, puru_object, pri_object);