import React from "react";
import { useSelector } from "react-redux";

const CustomersTab = () => {
  const customers = useSelector((state) => state.customers);

  return (
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Total Purchase Amount</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            <td>{customer.name}</td>
            <td>{customer.phoneNumber}</td>
            <td>{customer.email}</td>
            <td>{customer.totalPurchaseAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTab;
