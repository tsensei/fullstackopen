const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    default:
      return null;
  }
};

export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: message,
  };
};

export default notificationReducer;
