const moment = require.requireActual("moment");

export default (timestamp = 0) => {
   return moment(timestamp);
};

//if timestamp exist we use it, if not we will set it to 0