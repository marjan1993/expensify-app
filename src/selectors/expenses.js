import moment from "moment";

//get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt)
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;//new way
      // const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate ;// OR || //--> old way
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;//new way
      // const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;//---> old way
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
      //includes() is case-sensitive so we use toLowerCase()
  
     return startDateMatch && endDateMatch && textMatch; //AND &&
     //if all of this are true the filter function will be true and the item will be kept in the array
     // and if any of these are false the whole we be false because we use AND logical so the item will be removed from the array
    }).sort((a, b) => {
       if (sortBy === "date") {
         return a.createdAt < b.createdAt ? 1 : -1 ;//if a < b so b should comes first :(otherwise if not) a will comes first
       } else if (sortBy === "amount") {
           return a.amount < b.amount ? 1 : -1 ;
       } 
     //in code (sortBy === "amount") : return a.amount < b.amount ? -1 : 1 ;if a < b so a should comes first :(otherwise if not) b will comes first
     // with -1 a would come fist
     // with  1 b would come fist
 
    });
 };
 