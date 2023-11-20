import React from "react";
import { useInvoiceListData } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editSelectedInvoices,
  emptySelectedInvoices,
} from "../redux/invoicesBulkSlice";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";

const InvoicesEdit = () => {
  const { selectedList } = useInvoiceListData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(selectedList[0]);
  const [updatedInvoices, setUpdatedInvoices] = useState([...selectedList]);

  const handleEditAll = () => {
    dispatch(editSelectedInvoices({ updatedFields: updatedInvoices }));
    dispatch(emptySelectedInvoices());
    navigate("/")
  };

  const handleInvoiceData = (updatedData) => {
    const index = updatedInvoices.findIndex(
      (invoice) => invoice.id === updatedData.id
    );
    if (index !== -1) {
      setUpdatedInvoices((prevInvoices) => {
        const newInvoices = [...prevInvoices];
        newInvoices[index] = updatedData;
        return newInvoices;
      });
    }
  };

  const handleInvoiceChange = (updatedData) => {
    setFormData((prevData) => {
      const newFormData = { ...prevData, ...updatedData };
      return newFormData;
    });
  };

  return (
    <div>
      {!selectedList.length ? (
        <div className="d-flex flex-column align-items-center">
          <h3 className="fw-bold pb-2 pb-md-4">
            Select At Least One Invoice To Edit{" "}
          </h3>
          <Link to="/">
            <Button variant="primary">Select Invoices</Button>
          </Link>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "20px",
              justifyContent: "space-between",
            }}
          >
            <div className="d-flex align-items-center">
              <BiArrowBack size={18} />
              <div className="fw-bold mt-1 mx-2 cursor-pointer">
                <Link to="/">
                  <h5>Go Back</h5>
                </Link>
              </div>
            </div>
            <div>
              <h2>Edit Selected Invoices</h2>
            </div>
            <div>
              <Button
                variant="success"
                onClick={handleEditAll}
                style={{
                  padding: "10px 20px",
                  fontSize: "15px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                Edit All
              </Button>
            </div>
          </div>

          <div>
            <InvoiceForm
              key={formData.id}
              invoiceData={formData}
              handleInvoiceData={handleInvoiceData}
            />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "90%",
              background: "#fff",
            }}
          >
            <Row>
              {selectedList.map((invoice) => (
                <Col
                  key={invoice.id}
                  onClick={() => handleInvoiceChange(invoice)}
                  style={{
                    background:
                      invoice.id === formData.id ? "#068DA9" : "#9EB8D9",
                    padding: "10px",
                    margin: "5px",
                  }}
                >
                  <div className="text-center">
                    <h6>Invoice No - {invoice.invoiceNumber}</h6>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesEdit;
