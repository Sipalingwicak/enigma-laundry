let navigateFunction = null;

export const setNavigator = (navigate) => {
  navigateFunction = navigate;
};

export const redirectToLogin = () => {
  if (navigateFunction) {
    navigateFunction("/login");
  } else {
    console.error("Navigator not set");
  }
};
