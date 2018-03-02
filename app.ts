// Basic Class Decorator - must take only the constructor function as an arg
function logged(constructorFn: Function) {
    console.log(constructorFn);
}

@logged
class Person {
    constructor() {
        console.log('Hello World');
    }
}

// Factory
function logger(show: boolean) {
    return show ? logged : null;
}

@logger(true)
class Car {
    constructor() {
        console.log('I am a car');
    }
}

// A Useful Decorator
function printer(constructorFn: Function) {
    constructorFn.prototype.print = function() {
        console.log(this);
    };
}

@printer
class Tree {
    name = 'A green tree';
    height = 10;
}
const tree = new Tree();
(<any>tree).print();

// Multiple Decorators
@logger(true)
@printer
class Tea {
    name = 'Oolong';
}

const tea = new Tea();
(<any>tea).print();

// Method Decorator
function editable(value: boolean) {
    return function(target: any, propName: string, descriptor: PropertyDescriptor) {
        descriptor.writable = value;
    }
}

class Project {
    pName: string;
    budget: number;
    constructor(name: string, budget: number) {
        this.pName = name;
        this.budget = budget;
    }
    @editable(false)
    calcBudget() {
        console.log(this.budget);
    }
}

const project = new Project('Super TS Project', 1000);
project.calcBudget();
project.calcBudget = () => console.log(2000); // No error, but fails to overwrite method
project.calcBudget();

// Property decorators are somewhat less useful and should really only be used as listeners say for returning a value or running some code on a change of that property - we can't access all the methods tha we can on a method (e.g, the current descriptor)... 
function overwritable(value: boolean) {
    return function (target: any, propName: string): any {
        const newDescriptor: PropertyDescriptor = { writable: value }; 
        return newDescriptor;
    }
}

class ProjectProfile {
    @overwritable(false)
    pName: string;
    budget: number;
    constructor(name: string, budget: number) {
        this.pName = name;
        this.budget = budget;
    }
    @editable(false)
    calcBudget() {
        console.log(this.budget);
    }
}

const project2 = new ProjectProfile('TS Project 2', 3000);
project2.calcBudget();
console.log(project2); // The decorator prevents even the initial write in the constructor

// Parameter Decorator
function printInfo(target: any, methodName: string, paramIndex: number) {
    console.log('Target: ', target);
    console.log('methodName: ', methodName);
    console.log('paramIndex: ', paramIndex);
}

class Course {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    printStudents(@printInfo printAll: boolean) {
        printAll ? console.log(1000) : console.log(500);
    }
}

const course = new Course('TS Course');
course.printStudents(false);
course.printStudents(true);