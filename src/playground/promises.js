const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve({
           name:"Mari",
           age:27
       });
   
      // reject("Something went wrong!");
    }, 5000);//5000 ms -> 5 seconds 
});
//we can only have a single argument and single value  to resolve or reject
//we can call resolve or reject just single time, so we can't have resolve two times promise will ignore it 
// so we can only call resolve or reject single time or a single argument 
console.log("before");


promise.then((data) => {//.then lets us register a call back ,that call back is gonna fire when and if promise resolves
   console.log("1", data);

   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve("This is my other promise");
      }, 5000);
  });
}).then((str) => {
   console.log("dose this run?", str);
}).catch((error) => {
   console.log("error: ", error);
});

// //same result but .then can take two arguments, two functions like catch() handler
// promise.then((data) => {//.then lets us register a call back ,that call back is gonna fire when and if promise resolves
//     console.log("1", data);
//  }, (error) => {
//     console.log("error: ", error);
// });


console.log("after");