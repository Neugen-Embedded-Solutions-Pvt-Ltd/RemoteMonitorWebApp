import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
console.log(typeof thunk);


// Configure persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth']
}

// Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action paths or state paths if necessary
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(logger),
});
export const persistor = persistStore(store);
export default store;
