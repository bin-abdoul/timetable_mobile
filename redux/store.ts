import { api } from "@/api/requests/api";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./userSlice";
const rootReducer = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([api.middleware]),
});

// Type for the root state
export type RootState = ReturnType<typeof rootReducer>;

// Types for dispatch, state, and thunks
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
