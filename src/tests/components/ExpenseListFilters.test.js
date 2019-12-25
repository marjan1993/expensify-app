import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import { DateRangePicker } from "react-dates";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
      <ExpenseListFilters
         filters={filters}
         setTextFilter={setTextFilter}
         sortByAmount={sortByAmount}
         sortByDate={sortByDate}
         setStartDate={setStartDate}
         setEndDate={setEndDate}
      />
    );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
    wrapper.setProps({
       filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
  });


test("should handle on text change", () => {
  const value = "Water"
  wrapper.find("input").simulate("change", {
      target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
 });

 
 test("should sort by date", () => {
    value = "date";
    wrapper.setProps({ // it is default date we use this and switch to amount
        filters: altFilters
    });
    wrapper.find("select").simulate("change", {
        target: { value } 
    });
    expect(sortByDate).toHaveBeenLastCalled();
 });

 test("should sort by amount", () => {
    value = "amount";
    wrapper.find("select").simulate("change", {
        target: { value } 
    });
    expect(sortByAmount).toHaveBeenLastCalled();
 });

test("should handle date change", () => {
   const startDate = moment(0).add(4, "years");
   const endDate = moment(0).add(8, "years");
   wrapper.find(DateRangePicker).prop("onDatesChange")({ startDate, endDate });
   expect(setStartDate).toHaveBeenLastCalledWith(startDate);
   expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


 test("should handle date focus change ", () => {
    const calenderFocused = "endDate";
    wrapper.find(DateRangePicker).prop("onFocusChange")(calenderFocused);
    expect(wrapper.state("calenderFocused")).toBe(calenderFocused);//since we are comparing to stings
 });


