import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { 
  startAddExpense, 
  editExpense, 
  startEditExpense,
  removeExpense,
  startRemoveExpense, 
  addExpense, 
  setExpenses, 
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
   const expensesData = {};
   expenses.forEach(({ id, description, note, amount, createdAt }) => {
      expensesData[id] = { description, note, amount, createdAt };//we used shorthand way for all properties {description: description, ...}
   });
   database.ref("expenses").set(expensesData).then(() => done());
});

test("should setup remove expense action object", () => {
    const action = removeExpense({ id: "123abc" });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc"
    });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type: "REMOVE_EXPENSE",
       id
     });
     return database.ref(`expenses/${id}`).once("value");
  }).then((snapshot) => {
     expect(snapshot.val()).toBeFalsy();//toBeFalsy make sure that assertion passes if the value is falsy,if it's not then assertion thrown an error
     done();
  });

});

test("should setup edit expense action object", () => {
    const action = editExpense("123abc", { note: "new note value"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc",
        updates: {
           note: "new note value"
        }
    });
});

test("should edit expenses from firebase", (done) =>{
  const store = createMockStore({});
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store.dispatch(startEditExpense(id, updates)).then(()=> {//action dispatch correctly
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
        id,
        updates
    });
    return database.ref(`expenses/${id}`).once("value");//database in firebase should change
  }).then((snapshot) => {//fetch the data to firebase
     expect(snapshot.val().amount).toBe(updates.amount);
     done();
  });
});

test("should setup add expense action object with provided value", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
      type: "ADD_EXPENSE",
      expense: expenses[2]
    });
});

test("should add expense to database and store", (done) =>{
   const store = createMockStore({});
   const expenseData = {
       description: "Mouse",
       amount: 3000,
       note: "This one is better",
       createdAt: 1000
   };

   store.dispatch(startAddExpense(expenseData)).then(() => {
       const actions = store.getActions();//Returns the actions of the mock store.
       expect(actions[0]).toEqual({
          type: "ADD_EXPENSE",
          expense: {
              id: expect.any(String),
              ...expenseData
          }
       });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
   }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults database and store", (done) =>{
   const store = createMockStore({});
   const expenseDefault = {
       description: "",
       amount: 0,
       note: "",
       createdAt: 0
   };

   store.dispatch(startAddExpense({})).then(() => {
       const actions = store.getActions();//all of the actions
       expect(actions[0]).toEqual({
          type: "ADD_EXPENSE",
          expense: {
              id: expect.any(String),
              ...expenseDefault
          }
       });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
   }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefault);
      done();
    });
});

// test("should setup add expense action object with default value", () => {
//     const action = addExpense();
//     expect(action).toEqual({
//        type: "ADD_EXPENSE",
//        expense: {
//         description: "",
//         note: "",
//         createdAt: 0,
//         amount: 0,
//         id: expect.any(String)
//        }
//     });
// });

test("should setup set expense action object data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type: "SET_EXPENSES",
       expenses
     });
    // expect(actions[0].equals({ type: "SET_EXPENSES", expenses })).toBe(true);
    //expect(received.equals(expected)).toBe(true) -> jest docs way to solve the test fail
    done();
  });
});