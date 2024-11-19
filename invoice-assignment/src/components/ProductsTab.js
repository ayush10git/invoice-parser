import React from "react";
import { useSelector } from "react-redux";

const ProductsTab = () => {
  const products = useSelector((state) => state.products);

  return (
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Tax</th>
          <th>Price with Tax</th>
          <th>Discount</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.unitPrice}</td>
            <td>{product.tax}</td>
            <td>{product.priceWithTax}</td>
            <td>{product.discount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTab;
