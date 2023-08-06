import { configureStore } from "@reduxjs/toolkit";
import { PERSIST, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "toolkit",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ REHYDRATE, PERSIST, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
