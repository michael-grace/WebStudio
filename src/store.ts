import rootReducer, { RootState } from "./rootReducer";
import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { mixerMiddleware, mixerKeyboardShortcutsMiddleware } from "./mixer/state";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), mixerMiddleware, mixerKeyboardShortcutsMiddleware]
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;