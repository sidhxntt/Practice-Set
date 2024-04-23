const person = {
    name: "John",
    age: 30,
    city: "New York",
    family: {
        Mother_name: "Jane",
        Father_name: "Tom",
        Brother_name: "Jack"
    },
    info: function() {
        return `Name is ${this.name} having age ${this.age} and mother's name being ${this.family.Mother_name}`;
    }
};
 module.exports=person;
