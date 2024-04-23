const StudentPreset = {
    University: "Massachusetts Institute of Technology",
    Course: "Bachelors of Technology",
    School: "School of Computer Science",
    CourseID: "CS-102",
    checkIDvalidity() {
        let n = this.CourseID.indexOf("102");
        let id_size = parseInt(this.CourseID.substring(n + 3));
        if (id_size === 102) return true; 
        else return false;
    }
};

class StudentTemplate {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

Object.assign(StudentTemplate.prototype, StudentPreset); // Inherit properties from StudentPreset

let student1 = new StudentTemplate("John Doe", 25);
let student2 = new StudentTemplate("John Doe", 19);
console.log(student1.checkIDvalidity()); // Outputs: true since CourseID is "CS-102"
let arr= [student1, student2];
arr.map((val)=>{
   console.log(`Name : ${val.name}, Age: ${val.age}`); 
});