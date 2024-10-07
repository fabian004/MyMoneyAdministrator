import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TotalsState {
  user:string
  total: number;
  earningsTotal:number;
  grandTotal:number;
}

const initialState: TotalsState = {
  user: "",
  total: 0,
  earningsTotal:0,
  grandTotal:0
};

const totalsSlice = createSlice({
  name: 'totals',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
      state.grandTotal = state.earningsTotal - state.total
    },
    setEarningsTotal(state, action: PayloadAction<number>) {
      state.earningsTotal = action.payload;
      state.grandTotal = state.earningsTotal - state.total
    },
  },
});

export const { setUser, setTotal, setEarningsTotal } = totalsSlice.actions;
export default totalsSlice.reducer;
