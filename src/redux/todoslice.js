import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";

const initialState = {
    data: [],
    loading: false,
    error: ""
}

export const getTodos = createAsyncThunk("get-todo",async () => {
    const { data } = await api.get("/todos");
    const filtered = data?.filter((todos,index) => index < 10 && todos);
    return filtered;
})

export const addTodo = createAsyncThunk("add-todo",async title => {
    const { data } = await api.post("/todos",{
        completed: false,
        title,
        userId: 10
      })
    return data;
})

export const deleteTodo = createAsyncThunk("delete-todo",async id => {
    const { data } = await api.delete(`/todos/${id}`);
    return [data,id];
})

const todosSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: builder => {
        // get todo list action start
        builder.addCase(getTodos.pending,state => {
            state.loading = true;
        });
        builder.addCase(getTodos.fulfilled,(state,{payload}) => {
            state.loading = false;
            state.data = payload;
        })
        builder.addCase(getTodos.rejected,(state,{error}) => {
            state.loading = false;
            state.error = error;
        })
        // get todo list action end

        // add todo action start
        builder.addCase(addTodo.pending,state => {
            state.loading = true;
        })

        builder.addCase(addTodo.fulfilled,(state,{payload}) => {
            state.loading = false;
            state.data = [...state.data,payload];
        })

        builder.addCase(addTodo.rejected,(state,{error}) => {
            state.loading = false;
            state.error = error;
        })
        // add todo action end

        // delete todo action start
        builder.addCase(deleteTodo.pending,state => {
            state.loading = true;
        })

        builder.addCase(deleteTodo.fulfilled,(state,{payload}) => {
            state.loading = false;
            state.data = state.data.filter(todo => todo.id !== payload[1]);
        })

        builder.addCase(deleteTodo.rejected,(state,{error}) => {
            state.loading = false;
            state.error = error;
        })
        // delete todo action end
    }
})

export default todosSlice.reducer;