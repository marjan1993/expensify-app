import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
   editExpense = jest.fn();
   removeExpanse = jest.fn();
   history = { push: jest.fn() };
   wrapper = shallow(
    <EditExpensePage 
      editExpense={editExpense} 
      removeExpanse={removeExpense}
      history={history} 
      expense={expenses[2]}
     />
   );
});

test("should render EditExpensePage correctly", () => {
   expect(wrapper).toMatchSnapShot();
});

test("should handle editExpense", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
 });

 test("should handle removeExpense", () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(removeExpense).toHaveBeenLastCalledWith({
      id: expenses[2].id
    });
 });