import React from "react"
import moment from "moment";
import { SingleDatePicker } from "react-dates";

const now = moment();
console.log(now.format("MM Do, YYYY"));

export default class ExpenseForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        description: props.expense ? props.expense.description : "",
        note: props.expense ? props.expense.note : "",
        amount: props.expense ? (props.expense.amount/100).toString() : "",
        createdAd: props.expense ? moment(props.expense.createdAd) : moment(),
        calenderFocused: false,
        error: ""
      }
    }
    componentDidUpdate(prevProps) {
      if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
      }
    }
    onDescriptionChange = (e) => {
         const description = e.target.value;
         this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));

        // //second way to do that this will work as well 
        // e.persist();
        // this.setState(() => ({ note: e.target.value }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
          this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAd) => {
        if (createdAd) {
          this.setState(() => ({ createdAd }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
           this.setState(() => ({ error: "Please provide description and amount" }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
              description: this.state.description,
              amount: parseFloat(this.state.amount, 10) * 100,
              createdAd: this.state.createdAd.valueOf(),
              note: this.state.note
            });
        }
    };
    render() {
       return (
          <div>
          {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit} value={this.state.error}>
              <input 
                type="text" 
                placeholder="Description" 
                autoFocus 
                value={this.state.description} 
                onChange={this.onDescriptionChange} 
              />
              <input 
                type="text" 
                placeholder="Amount" 
                value={this.state.amount} 
                onChange={this.onAmountChange}
              />
              <SingleDatePicker
                date={this.state.createdAd}
                onDateChange={this.onDateChange}
                focused={this.state.calenderFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
              <textarea 
                placeholder="Add a note for your expense (optional)"
                value={this.state.note} 
                onChange={this.onNoteChange}
              >
              </textarea>
              <button>Add Expense</button>
            </form>
          </div>
        )
    }
}

//isOutsideRange = false means it's ner out of range so all date of past, present and feature will be available

