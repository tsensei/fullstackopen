import { createStore, applyMiddleware, combineReducers } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

console.log(store.getState());

export default store;
