import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer } from "./customerSlice";
import { makeEditTrueFalse } from "./editControllerSlice";
import { Button, Card } from "flowbite-react";
import CustomerForm from "./CustomerForm";
import { Link } from "react-router-dom";
import * as Style from "./CustomerList.styled";

const CustomerList = () => {
  const dispatch = useDispatch();
  const [editingCustomer, setEditingCustomer] = useState(null);
  const customers = useSelector((state) => state.customers.customers);
  const edit = useSelector((state) => state.edit.isEdit);

  // Handle Edit functionality
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    dispatch(makeEditTrueFalse(true));
  };

  // Handle Delete functionality
  const handleDelete = (PAN) => {
    dispatch(deleteCustomer({ PAN }));
  };

  return (
    <Style.Container>
      {edit ? (
        <CustomerForm existingCustomer={editingCustomer} />
      ) : (
        <Style.Content>
          <Style.List>
            <Style.Heading>Customer List</Style.Heading>
            <Link to={"/addNew"}>
              <Button color="blue">Add New Customer</Button>
            </Link>
          </Style.List>
          <Style.Display>
            {customers.map((customer) => (
              <Card>
                <Style.Details key={customer.PAN}>
                  <Style.Row>
                    <Style.Text>PAN:</Style.Text> {customer.PAN}
                  </Style.Row>
                  <Style.Row>
                    <Style.Text>Full Name:</Style.Text> {customer.fullName}
                  </Style.Row>
                  <Style.Row>
                    <Style.Text>Email:</Style.Text> {customer.email}
                  </Style.Row>
                  <Style.Row>
                    <Style.Text>Mobile:</Style.Text> {customer.mobile}
                  </Style.Row>
                  {customer.addresses.map((address, index) => (
                    <div key={index}>
                      <Style.Text1>Address {index + 1}:</Style.Text1>
                      <Style.Row>
                        <Style.Text>Address Line 1:</Style.Text>{" "}
                        {address.addressLine1}
                      </Style.Row>
                      <Style.Row>
                        <Style.Text>Address Line 2:</Style.Text>{" "}
                        {address.addressLine2}
                      </Style.Row>
                      <Style.Row>
                        <Style.Text>Postcode:</Style.Text> {address.postcode}
                      </Style.Row>
                      <Style.Row>
                        <Style.Text>City:</Style.Text> {address.city}
                      </Style.Row>
                      <Style.Row>
                        <Style.Text>State:</Style.Text> {address.state}
                      </Style.Row>
                    </div>
                  ))}
                  <Style.Buttons>
                    <Button color="blue" onClick={() => handleEdit(customer)}>
                      Edit
                    </Button>
                    <Button
                      color="failure"
                      onClick={() => handleDelete(customer.PAN)}
                    >
                      Delete
                    </Button>
                  </Style.Buttons>
                </Style.Details>
              </Card>
            ))}
          </Style.Display>
        </Style.Content>
      )}
    </Style.Container>
  );
};

export default CustomerList;
