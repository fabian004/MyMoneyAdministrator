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
      state.total = parseFloat(action.payload.toFixed(2));
      state.grandTotal = parseFloat((state.earningsTotal - state.total).toFixed(2));
    },
    setEarningsTotal(state, action: PayloadAction<number>) {
      state.earningsTotal = parseFloat(action.payload.toFixed(2));
      state.grandTotal = parseFloat((state.earningsTotal - state.total).toFixed(2));
    },
  },
});

export const { setUser, setTotal, setEarningsTotal } = totalsSlice.actions;
export default totalsSlice.reducer;
