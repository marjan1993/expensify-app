import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />)// that we grab from fixtures/expenses 
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />)// that we grab from fixtures/expenses data
    expect(wrapper).toMatchSnapshot();
});