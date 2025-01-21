import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import groupReducer from "../features/group/groupSlice";
import themeReducer from "../features/theme/themeSlice";
import fileExplorerReducer from "../features/FileExplorer/FileExplorer";
import fontSizeReducer from "../features/font/fontSizeSlice";
import backgroundReducer from "../features/theme/backgroundSlice";
import boardReducer from "../features/Project/ProjectSlice";
import addedReducer from "../features/Project/Added";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  group: groupReducer,
  theme: themeReducer,
  file: fileExplorerReducer,
  fontSize: fontSizeReducer,
  background: backgroundReducer,
  board: boardReducer,
  added: addedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
        ignoredPaths: ["_persist"],
      },
    }),
});

export const persistor = persistStore(store);
