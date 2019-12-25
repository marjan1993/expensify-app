import uuid from "uuid";

//ADD_EXPENSE
export const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
    id: uuid(),
    description,//description : description, but we use shorthand way since the names are the same
    note,
    amount,
    createdAt
    }
});

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({ 
    type: "REMOVE_EXPENSE",
    id  //OR id: id 
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
   type: "EDIT_EXPENSE",
   id,
   updates
});