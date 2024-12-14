import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import { checkTokenExpirationMiddleware } from "../middlewares/tokenMiddleware";

export default configureStore({
  reducer: { auth },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(checkTokenExpirationMiddleware);
  },
});
