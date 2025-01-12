import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Invoice.css";

function Invoice({ username }) {
  const [isDollar, setIsDollar] = useState(true);

  const toggleCurrency = () => {
    setIsDollar((prev) => !prev);
  };

  const [initialValues, setInitialValues] = useState({
    purchaseOrder: "",
    invoiceNumber: "",
    invoiceDate: "",
    vendor: "",
    totalAmount: "",
    currency: "",
    paymentTerms: "",
    dueDate: "",
    glPostDate: "",
    invoiceDescription: "",
    lineAmount: "",
    department: "",
    account: "",
    location: "",
  });

  // Load invoice data for the specific username from localStorage
  useEffect(() => {
    const storedInvoiceData = JSON.parse(
      localStorage.getItem(`${username}_invoiceData`)
    );
    if (storedInvoiceData) {
      setInitialValues(storedInvoiceData);
    }
  }, [username]);

  const validationSchema = Yup.object({
    purchaseOrder: Yup.string().required("Purchase Order Number is required"),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    invoiceDate: Yup.date().required("Invoice Date is required"),
    totalAmount: Yup.number().required("Total Amount is required"),
    paymentTerms: Yup.string().required("Payment Terms are required"),
    dueDate: Yup.date().required("Invoice Due Date is required"),
    glPostDate: Yup.date().required("GL Post Date is required"),
    invoiceDescription: Yup.string().required(
      "Invoice Description is required"
    ),
    lineAmount: Yup.number().required("Line Amount is required"),
    department: Yup.string().required("Department is required"),
    account: Yup.string().required("Account is required"),
    location: Yup.string().required("Location is required"),
  });

  const handleSubmit = (values) => {
    // Save the form data to localStorage for the specific user
    localStorage.setItem(`${username}_invoiceData`, JSON.stringify(values));

    // Show success alert
    alert("Data submitted successfully!");
    console.log("Form Submitted", values);
  };

  return (
    <div className="container">
      <h2 className="header">Invoice Details</h2>
      <h3 className="info">General Information</h3>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form>
            {/* Purchase Order */}
            <div className="field-container">
              <label htmlFor="purchaseOrder" className="label">
                Purchase Order Number
              </label>
              <Field
                as="select"
                name="purchaseOrder"
                id="purchaseOrder"
                className="dropdown"
              >
                <option value="" disabled>
                  Select PO number
                </option>
                <option value="po1">PO-001</option>
                <option value="po2">PO-002</option>
                <option value="po3">PO-003</option>
              </Field>
              <ErrorMessage
                name="purchaseOrder"
                component="div"
                className="error-message"
              />
            </div>

            <h3
              className="info"
              style={{ textAlign: "left", marginTop: "20px" }}
            >
              Invoice Details
            </h3>

            {/* Invoice Number and Date */}
            <div className="row">
              <div className="field-container">
                <label htmlFor="invoiceNumber" className="label">
                  Invoice Number
                </label>
                <Field
                  as="select"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  className="input-field"
                >
                  <option value="" disabled>
                    Select Invoice Number
                  </option>
                  <option value="inv1">INV-001</option>
                  <option value="inv2">INV-002</option>
                  <option value="inv3">INV-003</option>
                </Field>
                <ErrorMessage
                  name="invoiceNumber"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="field-container">
                <label htmlFor="invoiceDate" className="label">
                  Invoice Date
                </label>
                <Field
                  type="date"
                  name="invoiceDate"
                  id="invoiceDate"
                  className="date-field"
                />
                <ErrorMessage
                  name="invoiceDate"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Total Amount and Payment Terms */}
            <div className="row">
              <div className="field-container">
                <label htmlFor="totalAmount" className="label">
                  Total Amount
                </label>
                <div className="amount-container">
                  <Field
                    type="text"
                    name="totalAmount"
                    id="totalAmount"
                    className="textarea"
                    placeholder="$0.0"
                  />
                </div>
                <ErrorMessage
                  name="totalAmount"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="field-container">
                <label htmlFor="paymentTerms" className="label">
                  Payment Terms
                </label>
                <Field as="select" name="paymentTerms" className="dropdown">
                  <option value="" disabled>
                    Select Payment Terms
                  </option>
                  <option value="net30">Net 30</option>
                  <option value="net45">Net 45</option>
                  <option value="net60">Net 60</option>
                </Field>
                <ErrorMessage
                  name="paymentTerms"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Due Date and GL Post Date */}
            <div className="row">
              <div className="field-container">
                <label htmlFor="dueDate" className="label">
                  Invoice Due Date
                </label>
                <Field
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="date-field"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="field-container">
                <label htmlFor="glPostDate" className="label">
                  GL Post Date
                </label>
                <Field
                  type="date"
                  name="glPostDate"
                  id="glPostDate"
                  className="date-field"
                />
                <ErrorMessage
                  name="glPostDate"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Invoice Description */}
            <div className="field-container">
              <label htmlFor="invoiceDescription" className="label">
                Invoice Description
              </label>
              <Field
                type="text"
                name="invoiceDescription"
                id="invoiceDescription"
                className="textarea"
                placeholder="Enter description"
              />
              <ErrorMessage
                name="invoiceDescription"
                component="div"
                className="error-message"
              />
            </div>

            {/* Expense Details */}
            <div className="disp">
              <h2
                className="info"
                style={{ textAlign: "left", marginTop: "20px" }}
              >
                Expense Details
              </h2>
              <div className="inner-disp">
                <span className="expense-text">
                  $0.0/<span style={{ color: "#1976d2" }}>$0.0</span>
                </span>
                <div className="expense-toggle" onClick={toggleCurrency}>
                  <div
                    className={`toggle-switch ${
                      isDollar ? "dollar" : "percent"
                    }`}
                  >
                    <span className="toggle-text">{isDollar ? "$" : "%"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Amount, Department, Account, and Location */}
            <div className="row">
              <div className="field-container">
                <label htmlFor="lineAmount" className="label">
                  Line Amount
                </label>
                <div className="amount-container">
                  <Field
                    type="text"
                    name="lineAmount"
                    id="lineAmount"
                    className="input-field"
                    placeholder="$0.0"
                  />
                </div>
                <ErrorMessage
                  name="lineAmount"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="field-container">
                <label htmlFor="department" className="label">
                  Department
                </label>
                <Field as="select" name="department" className="dropdown">
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="it">IT</option>
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="row">
              <div className="field-container">
                <label htmlFor="account" className="label">
                  Account
                </label>
                <Field as="select" name="account" className="dropdown">
                  <option value="" disabled>
                    Select Account
                  </option>
                  <option value="acc1">Account 1</option>
                  <option value="acc2">Account 2</option>
                </Field>
                <ErrorMessage
                  name="account"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="field-container">
                <label htmlFor="location" className="label">
                  Location
                </label>
                <Field as="select" name="location" className="dropdown">
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option value="loc1">Location 1</option>
                  <option value="loc2">Location 2</option>
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="btn">
              <button
                type="button"
                className="add-expense-btn"
                onClick={() => console.log("Add Expense Coding")}
              >
                + Add Expense Coding
              </button>
            </div>

            <div className="button-group">
              <button type="submit" className="save-draft-btn">
                Save as Draft
              </button>
              <button type="submit" className="submit-new-btn">
                Submit & New
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Invoice;
