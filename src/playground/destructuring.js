//Object Destructuring 

// const person = {
//     name: "Marjan",
//     age: 26,
//     location: {
//       city: "Nurabad",
//       temp: 33
//     }
// };

// // const name = person.name;
// // const age = person.age;

// //same result but shorthand way
// const { name: firstName = "Anonymous", age } = person; //this is a way to set rename and default value of an object property
// console.log(`${firstName} is ${age}`);
// //default value -> name ="Anonymous"
// //rename -> name: firstName

// // if (person.location.temp && person.location.city) {
// //    console.log(`it's ${person.location.temp} in ${person.location.city}`);
// // }

// //same result but shorthand way
// const { temp: temperature, city } = person.location; //this is a way to rename an object property
// if (temperature && city) {
//    console.log(`it's ${temperature} in ${city}`);
// }

//==============================================================================================================

// const book  = {
//     title: "Jane Eyre",
//     author: "Charlotte Brontë",
//     publisher: {
//        //name: "Panguin"
//     }
// };
// const { name: publisherName = "Self-Published" } = book.publisher; //Self-Published is a default value and we renamed the name with publishName

// console.log(publisherName);

//================================================================================================================
//Array Destructuring 
//

// const address = ["Farhang.St", "Delfan", "Nurabad", "83388"];
// const [street, city, state, zip] = address;

// console.log(`You are in ${city} ${state}.`);


// const address = ["Farhang.St", "Delfan", "Nurabad", "83388"]; 
// const [, , state] = address;
// // in Array Destructuring  there is no renaming syntax
// console.log(`You are in ${state}.`);



// const address = []; 
// const [, , state = "Khorramabad"] = address;
// //like object in Array Destructuring,there is default value syntax and we can use it
// console.log(`You are in ${state}.`);

//===================================

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);

