import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import CustomersTab from "./components/CustomersTab";
import InvoicesTab from "./components/InvoicesTab";
import ProductsTab from "./components/ProductsTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div>
      <h1>Invoice Management System</h1>
      <FileUploader />
      <div className="tabs">
        <button onClick={() => setActiveTab("invoices")}>Invoices</button>
        <button onClick={() => setActiveTab("products")}>Products</button>
        <button onClick={() => setActiveTab("customers")}>Customers</button>
      </div>
      {activeTab === "invoices" && <InvoicesTab />}
      {activeTab === "products" && <ProductsTab />}
      {activeTab === "customers" && <CustomersTab />}
    </div>
  );
};

export default App;
