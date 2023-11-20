import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectedInvoiceList } from "./invoicesBulkSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);
  const selectedList = useSelector(selectedInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    selectedList,
    getOneInvoice,
    listSize,
  };
};
