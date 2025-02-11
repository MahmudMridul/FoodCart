import { signup, signin, signout, foodItems } from "../helpers/apis";
import { apiCall } from "../helpers/functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	open: false,

	foodItems: [],
	modalItem: null,
	cartItems: [],
	cartItemCount: 0,
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
		const data = await apiCall({
			url: signout,
			method: "delete",
			cred: "include",
		});
		return data;
	} catch (err) {
		console.error("auth/signOut", err);
	}
});

export const getFoodItems = createAsyncThunk("home/foodItems", async () => {
	try {
		const data = await apiCall({
			url: foodItems,
			method: "get",
			cred: "include",
		});
		return data;
	} catch (err) {
		console.error("home/foodItems", err);
	}
});

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		set(state, action) {
			const { key, value } = action.payload;
			state[key] = value;
		},

		setLoading(state, action) {
			state.loading = action.payload;
		},

		setOpen(state, action) {
			state.open = action.payload;
		},

		pushToCart(state, action) {
			state.cartItems.push(action.payload);
		},

		setCartItemCount(state) {
			let count = 0;
			state.cartItems.forEach((item) => {
				count += item.quantity;
			});
			state.cartItemCount = count;
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
			})

			.addCase(getFoodItems.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFoodItems.fulfilled, (state, action) => {
				if (action.payload && action.payload.success) {
					state.foodItems = action.payload.data;
				}
				state.loading = false;
			})
			.addCase(getFoodItems.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { set, setLoading, setOpen, pushToCart, setCartItemCount } =
	appSlice.actions;
export default appSlice.reducer;
