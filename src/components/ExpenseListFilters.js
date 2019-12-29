import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";

export class ExpenseListFilters extends React.Component {
   state = {
      calenderFocused: null
   };
   onDatesChange = ({ startDate, endDate }) => {
       this.props.setStartDate(startDate);
       this.props.setEndDate(endDate);
   };
   onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused: calenderFocused })); // OR shorthand way ({calenderFocused})
   };
   onTextChange = (e) => {
      this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
   if (e.target.value === "date") {
     this.props.sortByDate()
   } else if (e.target.value === "amount"){ 
     this.props.sortByAmount()
   }
};
   render() {
      return (
         <div>
           <input  
              type="text"
              value={this.props.filters.text} 
              onChange={this.onTextChange}
          />
           <select  
              value={this.props.filters.sortBY}
              onChange={this.onSortChange}
          >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
           </select>
           <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="start"
              endDate={this.props.filters.endDate}
              endDateId="end" 
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calenderFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
           />
         </div>
      );
      //(e) means event argument
      //target here is the input
   }
};


const mapStateToProps = (state) => {//explicitly returned
   return {
       filters: state.filters
   };
};

const mapDispatchToProps = (dispatch) => ({//implicitly returned
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);