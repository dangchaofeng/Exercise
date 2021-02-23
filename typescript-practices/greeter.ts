interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor(public firstName, public lastName){
        this.fullName = firstName + '' + lastName;
    }
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student( 'dang', 'chaofeng');

document.body.innerHTML = greeter(user);