import React from "react";
import { shallow } from "enzyme";
import ExpensesListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("should render ExpenseListItem correctly", () => {
    const wrapper = shallow(<ExpensesListItem expenses={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});