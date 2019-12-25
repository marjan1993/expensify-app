import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";


test("should render ExpenseForm correctly", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data", () => {
    const wrapper = shallow(<ExpenseForm expenses={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render error from invalid of submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").simulate("submit", {
       preventDefault: () => { }
    });
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate("change", {//at(0) for the first input since we have more than one input,we should define which input we wanna change like: for example at(1) for second input 
        target: { value }
    });
    expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
   const value = "New note value";
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find("textarea").simulate("change", {// note is one input wo we don't need at()
      target: { value }
   });
   expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
    const value = "23.50";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
       target: { value }
    });
    expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if invalid input", () => {
    const value = "12.122";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
       target: { value }
    });
    expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn(); //jest.fn() will create a new spy
    const wrapper = shallow(<ExpenseForm expenses={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find("form").simulate("submit", {
       preventDefault: () => { }
    });
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
       description: expenses[0].description,
       amount: expenses[0].amount,
       note: expenses[0].note,
       createdAt: expenses[0].createdAt
    });
});

test("should set new date on date change", () => {
   const now = moment();
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper.length).toEqual(1)
   wrapper.find(SingleDatePicker).prop("onDateChange")(now);
   expect(wrapper.state("createdAt")).toBe(now);
});

test("should set calender focus on change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper.length).toEqual(1)
    wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused });
    expect(wrapper.state("calenderFocused")).toBe(focused);
 });


