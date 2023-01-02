import { configureStore } from "@reduxjs/toolkit";
import todos from "./todoslice";

const store = configureStore({
    reducer: {
        todos
    }
})

export default store;