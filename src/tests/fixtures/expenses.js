import moment from "moment";

export default [{
    id: 1,
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: 0
}, {
    id: 2,
    description: "Rent",
    note: "",
    amount: 109500, //100 cent = 1$, so 00 is  for cent, 1095$
    createdAt:  moment(0).subtract(4, "days").valueOf() //-1000 --> 1 second in the past
}, {
    id: 3,
    description: "Credit Card",
    note: "",
    amount: 4500,
    createdAt: moment(0).add(4, "days").valueOf() //1000 --> 1 second in the feature
}];