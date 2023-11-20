import { createSlice } from "@reduxjs/toolkit";
import { updateInvoice } from "./invoicesSlice";

const invoicesBulkSlice = createSlice({
  name: "selectedInvoices",
  initialState: [],
  reducers: {
    addSelectedInvoices: (state, action) => {
      state.push(action.payload);
    },
    removeSelectedInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    emptySelectedInvoices: () => {
      return [];
    },
  },
});

export const editSelectedInvoices =
  ({ updatedFields }) =>
  (dispatch) => {
    updatedFields.forEach((invoice) => {
      dispatch(
        updateInvoice({
          id: invoice.id,
          updatedInvoice: invoice,
        })
      );
    });
  };

export const {
  addSelectedInvoices,
  removeSelectedInvoice,
  emptySelectedInvoices,
} = invoicesBulkSlice.actions;

export const selectedInvoiceList = (state) => state.selectedInvoices;

export default invoicesBulkSlice.reducer;
