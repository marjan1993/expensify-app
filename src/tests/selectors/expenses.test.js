import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";


test("should filter by text value", () => {
    const filters = {
       text: "e",// Includes "e" should stay and other like "Gum" should filter out
       sortBy: "date",
       startDate: undefined,
       endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]);
});

test("should filter by start date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]])
});

test("should filter by end date", () => {
    const filters = {
       text:"",
       sortBy:"date",
       startDate: undefined,
       endDate: moment(0).add(2, "days").valueOf() // date will end at 2 days from moment(0),current moment so just 1d:3 will be filter out because createdAt is 4 days from now 
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]])
});

test("should filter sort by date", () => {
    const filters = {
        text:"",
       sortBy:"date",
       startDate: undefined,
       endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("should filter sort by amount", () => {
    const filters = {
       text:"",
       sortBy:"amount",
       startDate: undefined,
       endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});


