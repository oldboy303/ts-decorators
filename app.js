var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Basic Class Decorator - must take only the constructor function as an arg
function logged(constructorFn) {
    console.log(constructorFn);
}
var Person = /** @class */ (function () {
    function Person() {
        console.log('Hello World');
    }
    Person = __decorate([
        logged
    ], Person);
    return Person;
}());
// Factory
function logger(show) {
    return show ? logged : null;
}
var Car = /** @class */ (function () {
    function Car() {
        console.log('I am a car');
    }
    Car = __decorate([
        logger(true)
    ], Car);
    return Car;
}());
// A Useful Decorator
function printer(constructorFn) {
    constructorFn.prototype.print = function () {
        console.log(this);
    };
}
var Tree = /** @class */ (function () {
    function Tree() {
        this.name = 'A green tree';
        this.height = 10;
    }
    Tree = __decorate([
        printer
    ], Tree);
    return Tree;
}());
var tree = new Tree();
tree.print();
// Multiple Decorators
var Tea = /** @class */ (function () {
    function Tea() {
        this.name = 'Oolong';
    }
    Tea = __decorate([
        logger(true),
        printer
    ], Tea);
    return Tea;
}());
var tea = new Tea();
tea.print();
// Method Decorator
function editable(value) {
    return function (target, propName, descriptor) {
        descriptor.writable = value;
    };
}
var Project = /** @class */ (function () {
    function Project(name, budget) {
        this.pName = name;
        this.budget = budget;
    }
    Project.prototype.calcBudget = function () {
        console.log(this.budget);
    };
    __decorate([
        editable(false)
    ], Project.prototype, "calcBudget", null);
    return Project;
}());
var project = new Project('Super TS Project', 1000);
project.calcBudget();
project.calcBudget = function () { return console.log(2000); }; // No error, but fails to overwrite method
project.calcBudget();
// Property decorators are somewhat less useful and should really only be used as listeners say for returning a value or running some code on a change of that property - we can't access all the methods tha we can on a method (e.g, the current descriptor)... 
function overwritable(value) {
    return function (target, propName) {
        var newDescriptor = { writable: value };
        return newDescriptor;
    };
}
var ProjectProfile = /** @class */ (function () {
    function ProjectProfile(name, budget) {
        this.pName = name;
        this.budget = budget;
    }
    ProjectProfile.prototype.calcBudget = function () {
        console.log(this.budget);
    };
    __decorate([
        overwritable(false)
    ], ProjectProfile.prototype, "pName", void 0);
    __decorate([
        editable(false)
    ], ProjectProfile.prototype, "calcBudget", null);
    return ProjectProfile;
}());
var project2 = new ProjectProfile('TS Project 2', 3000);
project2.calcBudget();
console.log(project2); // The decorator prevents even the initial write in the constructor
// Parameter Decorator
function printInfo(target, methodName, paramIndex) {
    console.log('Target: ', target);
    console.log('methodName: ', methodName);
    console.log('paramIndex: ', paramIndex);
}
var Course = /** @class */ (function () {
    function Course(name) {
        this.name = name;
    }
    Course.prototype.printStudents = function (printAll) {
        printAll ? console.log(1000) : console.log(500);
    };
    __decorate([
        __param(0, printInfo)
    ], Course.prototype, "printStudents", null);
    return Course;
}());
var course = new Course('TS Course');
course.printStudents(false);
course.printStudents(true);
