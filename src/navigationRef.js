import { NavigationActions } from "react-navigation";
let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params,
    })
  );
};

// Need to use the naviagate function to navigate between pages outside of components
// If inside components, just use withNavigation from react-navigation library as in the NavLink component
