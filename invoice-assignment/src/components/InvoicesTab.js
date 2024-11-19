import React from "react";
import { useSelector } from "react-redux";

const InvoicesTab = () => {
  const invoices = useSelector((state) => state.invoices);

  return (
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Customer Name</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Tax</th>
          <th>Total Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <tr key={index}>
            <td>{invoice.serialNumber}</td>
            <td>{invoice.customerName}</td>
            <td>{invoice.productName}</td>
            <td>{invoice.quantity}</td>
            <td>{invoice.tax}</td>
            <td>{invoice.totalAmount}</td>
            <td>{invoice.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoicesTab;
