import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CustomerForm from "./features/customers/CustomerForm";
import CustomerList from "./features/customers/CustomerList";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [editingCustomer, setEditingCustomer] = useState(null);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            // element={<CustomerForm/>}
            element={<CustomerList setEditingCustomer={setEditingCustomer} />}
          />
          <Route
            path="/addNew"
            element={<CustomerForm existingCustomer={editingCustomer} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
