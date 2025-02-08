import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import logger from "redux-logger";
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
// export const persistor = persistStore(store);
export default store;
