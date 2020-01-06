import * as firebase from "firebase";//so when we add * as we take all of those names exports and we create a new variable for them

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE-URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };




//Examples 

// database.ref().set({
//     name: 'Marjan Khakian',
//     age: 26,
//     stressLevel: 6,
//     job: {
//         title: "Software developer",
//         company: "Google"
//       //  title: "Manager",
//       //  company: "Amazon"
//     },
//     location: {
//        city: "New York",
//        country: "United States" 
//     }
// }).then(() => {
//     console.log("Data is saved");
// }).catch((e) => {
//    console.log("This failed.", e);
// });

// //update, set, remove support promises(.then() and .catch())

//====================================================================================
//Array data in firebase

/*
//child_removed -> Handle child removal 
database.ref("expenses").on("child_removed", (snapshot) => {
   console.log(snapshot.key, snapshot.val());
});

//child_changed -> Handle child data changes
database.ref("expenses").on("child_changed", (snapshot) => {
   console.log(snapshot.key, snapshot.val());
});

//child_added -> Handle a new child -- it's called for new children and the existing ones
database.ref("expenses").on("child_added", (snapshot) => {
   console.log(snapshot.key, snapshot.val());
});

//child_moved -> Handle child ordering changes
database.ref("expenses").on("child_moved",(snapshot) => {
   console.log(snapshot.key, snapshot.val());
}); 

database.ref("expenses").push({
   description: "Power Bill",
   note: "",
   createdAt: 10454600,
   amount: 8000
});
*/


/*
database.ref("expenses").on("value", (snapshot) => {
   const expenses = [];

   snapshot.forEach((childSnapshot) => {
      expenses.push({
       id: childSnapshot.key,
       ...childSnapshot.val()
      });
   });

   console.log(expenses);
});
*/

/*
database.ref("expenses")
  .once("value")
  .then((snapshot) => {
     const expenses = [];

     snapshot.forEach((childSnapshot) => {
        expenses.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
        });
     });
     console.log(expenses);
  });
*/


/*
database.ref("expenses").push({//you can pass in any data type that firebase supports  such as object and string 
   description: "Water Bill",
   note: "",
   createdAt: 10454600,
   amount: 10500
});

database.ref("expenses").push({
   description: " Rent",
   note: "This was last months rent",
   createdAt: 10454600,
   amount: 100000
});

database.ref("expenses").push({
   description: "Gas Bill",
   note: "",
   createdAt: 10454600,
   amount: 95500
});
*/

// database.ref("notes/-Lxm6lU9I6TA0ikkeRct").update({
//    body: "Buy Food"
// });

// database.ref("notes/-Lxm6lU9I6TA0ikkeRct").remove();

/*
database.ref("notes").push({
   title: "Course Topics",
   body: 'React native, Angular, Python'
});
*/

/*
const firebaseNotes = {
      agdhgjhki: {
         title: "First note!",
         body: "This is my note"
      },
      agfhtrhhmhogfhrtrbvn: {
         title: "Another note",
         body: "This is my note"
      }
};

database.ref("notes").set(firebaseNotes);
*/
//===================================================================================
//fetching data
/*
database.ref()
  .once("value")
  .then((snapshot) => {
     const val = snapshot.val();
     console.log(val);
  }).catch((e) => {
    console.log("Error fetching data",e);
  });
*/
/*
database.ref("location/city")
  .once("value")
  .then((snapshot) => {
     const val = snapshot.val();
     console.log(val);
  }).catch((e) => {
    console.log("Error fetching data",e);
  });
*/
/*
const onValueChange = database.ref().on("value", (snapshot) => {//on allow us to listen something for over and over again
   console.log(snapshot.val());
}, (e) => {
   console.log("Enter with data fetching", e);
});//another way to fetch data, we don't use promises because we want to run this function over and over but promises can only resolved or reject single time with the single value 

setTimeout(() => {
   database.ref("age").set(29);
}, 4000);//4000ms -> 4seconds

setTimeout(() => {
    database.ref().off(onValueChange);//off will cancel all subscriptions on the ref()
 }, 8000);

 setTimeout(() => {
    database.ref("age").set(30);
 }, 12000);
//on and of go together allowing you to set up and cancel subscriptions
*/
/*
database.ref().on("value", (snapshot) => {
   const val = snapshot.val();
   console.log(`${val.name} is ${val.job.title} at ${val.job.company}.`);
});
*/
//=========================================================================================

/*
//Update data
//update has to be called with an object
//update -> only updates at the root level which is not contain city and county in our case
database.ref().update({
    stressLevel: 9,
    "job/company" : "Amazon",
    "location/city": "Seattle"
 });

/*
database.ref().update({
   job: "Manager",
   "location/city": "Karaj"
});
*/
/*
//so with update we can change the existing object and add a new object and we can delete object as well
database.ref().update({
    name: "Mari",
    age: 25,
    job: "Software developer",
    isSingle: null
 });
*/

//===========================================================================

/*
//Remove data
database.ref("isSingle")
   .remove()
   .then(() => {
     console.log("Data was removed");
   }).catch((e) => {
      console.log("Did not remove data", e);
   });
*/
/*   
//Another way to remove data
database.ref("age").set(null);
*/

//=============================================================================


// database.ref().set("This is my data.");//set dose not have to take an object, set can take any of the data type se can store inside a firebase

/* 
database.ref().set({
     age: 27
});// this code will replace to whole object above
*/

// database.ref("age").set(27);// this code will update the age to 27 without changing other objects
// database.ref("location/city").set("Karaj");//give access to specific part od database like city


/*
//Andrew Mead way to solve the challenge 
database.ref("attributes").set({
        height: 170,
        weight: 50
}).then(() => {
   console.log("Second set call worked");
}).catch((e) => {
   console.log("Things didn't work for the second error", e);
});
*/


// console.log("I made a request to change the data.");

 
/*
//My way to solve the challenge 
database.ref().update({
    attributes: {
        height: 170,
        weight: 50
    }
});
*/





