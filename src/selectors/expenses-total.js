
//shorthand way 
export default (expenses) => {
    return expenses
     .map((expense) => expense.amount) //map -> add up numbers
     .reduce((sum, value) => {//reduce -> add up array of objects
        return sum + value
      }, 0);//start counting at 0
    //or we can use shorthand way just implicitly return it like ->  .reduce((sum, value) => sum + value , 0);
};


// //regular way 
// export default (expenses) => {
//   if (expenses.length === 0) {
//       return 0;
//   } else {
//     return expenses
//      .map((expense) => expense.amount) //map -> add up numbers
//      .reduce((sum, value) => {//reduce -> add up array of objects
//         return sum + value
//       }, 0); //or we can use shorthand way just implicitly return it like ->  .reduce((sum, value) => sum + value , 0);
//   } 
// };  




 