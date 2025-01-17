import { signup, signin, signout } from "../helpers/apis";
import { apiCall } from "../helpers/functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
};

export const signUp = createAsyncThunk("auth/signup", async (payload) => {
	try {
		const data = await apiCall({ url: signup, method: "post", payload });
		return data;
	} catch (err) {
		console.error("auth/signUp", err);
	}
});

export const signIn = createAsyncThunk("auth/signin", async (payload) => {
	try {
		const data = await apiCall({
			url: signin,
			method: "post",
			payload,
			cred: "include",
		});
		return data;
	} catch (err) {
		console.error("auth/signIn", err);
	}
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
	try {
		const user = JSON.parse(localStorage.getItem("user"));
		const auth = `Bearer ${user.accessToken}`;
		const data = await apiCall({
			url: signout,
			method: "delete",
			auth,
			cred: "include",
		});
		return data;
	} catch (err) {
		console.error("auth/signOut", err);
	}
});

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		set: {
			prepare(key, value) {
				return { key, value };
			},
			reducer(action, state) {
				const { key, value } = action.payload;
				state[key] = value;
			},
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.pending, (state) => {
				state.loading = true;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false;
				console.log(action.payload);
			})
			.addCase(signUp.rejected, (state) => {
				state.loading = false;
			})

			.addCase(signIn.pending, (state) => {
				state.loading = true;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				if (action.payload && action.payload.success) {
					localStorage.setItem("user", JSON.stringify(action.payload.data));
				}
				state.loading = false;
			})
			.addCase(signIn.rejected, (state) => {
				state.loading = false;
			})

			.addCase(signOut.pending, (state) => {
				state.loading = true;
			})
			.addCase(signOut.fulfilled, (state, action) => {
				if (action.payload && action.payload.success) {
					localStorage.removeItem("user");
				}
				state.loading = false;
			})
			.addCase(signOut.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { set, setLoading } = appSlice.actions;
export default appSlice.reducer;
