import authReducer from "../../reducers/auth";

test("should set uid for login", () => {
   const action = {
      type: "LOGIN",
      uid: "abc12345"
   };
   const state = authReducer({}, action);
   expect(state.uid).toBe(action.uid);
});

test("should clear uid for logout", () => {
    const action = {
       type: "LOGOUT"
    };
    const state = authReducer({uid: "anything"}, action);
    expect(state).toEqual({});
 });

 //create a test suit for default case with internet help :) 