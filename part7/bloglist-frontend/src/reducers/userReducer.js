import loginService from "../services/login";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const verifiedUser = await loginService.login(user);
      blogsService.setToken(verifiedUser.token);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(verifiedUser)
      );
      dispatch(setUser(verifiedUser));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Wrong username or password"));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 3000);
    }
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export default userReducer;
