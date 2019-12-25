import moment from "moment";

//for default values
const filters = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};


//for when we have actual values
const altFilters = {
  text: "bills",
  sortBy: "amount",
  startDate: moment(0),
  endDate: moment(0).add(3, "days")
};

export { filters, altFilters };