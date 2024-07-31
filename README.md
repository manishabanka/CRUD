# Customer Management CRUD Application

This project is a simple Customer Management CRUD application built using React.js with JavaScript and Redux for state management. The application allows you to add, edit, delete, and view customer data, with validation and API integration for specific fields.

## Features

- **Customer Form**: Add and edit customer details.
  - **PAN**: Required, valid PAN format for India, max length 10.
  - **Full Name**: Required, max length 140.
  - **Email**: Required, max length 255, valid format.
  - **Mobile Number**: Required, valid format, max length 10 with static prefix +91.
  - **Addresses**: Multiple addresses (max 10).

- **Customer List**: View all added customers with options to edit and delete.

- **PAN Verification**: Verifies PAN via an API.

- **Postcode Lookup**: Fetches city and state via an API based on the postcode.

- **State Management**: Uses Redux for managing the application state.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manishabanka/CRUD.git
   cd CRUD
   cd customer-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

## Usage

1. **Add a Customer**: Navigate to the Customer Form page, fill in the details, and click 'Submit'. The customer will be displayed on the Customer List page.

2. **Edit a Customer**: On the Customer List page, click the 'Edit' button next to a customer. Update the details in the form and submit to save changes.

3. **Delete a Customer**: On the Customer List page, click the 'Delete' button next to a customer to remove them from the list. 

## API Integration

- **PAN Verification API**: Used to validate the PAN field.
- **Postcode Lookup API**: Used to fetch city and state based on the postcode.



