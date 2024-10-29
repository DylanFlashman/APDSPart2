# Payment Portal

## Overview

This app allows users to create an account, log in, and make payments. It also provides an employee portal for transaction management and verification.

## Table of Contents

- [Features](#features)
- [Views](#views)
- [Technologies Used](#technologies-used)
- [Required for Usage](#required-for-usage)
- [Installation and Setup](#installation-and-setup)

## Features

- User registration and authentication
- Secure payment processing
- Intuitive navigation through different screens
- Responsive design for various devices
- Employee portal for managing transactions and verifying payments

## Views

### Home Page

The home page has a menu at the top. The menu contains the following:

- **Register**: Navigate to the registration screen.
- **Login**: Navigate to the login screen.
- **Payments**: Navigate to the payment submission screen.
- **Go to Payments Button**: Directs the user to the payments screen.
- **Employee Portal**: Navigates to the employee management screen (if the user is logged in as an employee).

### Register Screen

Here, users can register and create an account. The registration screen requires the users to provide the following information:

- **Full Name**
- **Username**
- **Email**
- **ID Number**
- **Account Number**
- **Password**

Once all fields are filled, the user can click the **Register** button. After successful registration, they will be taken to the login screen. The user can click the **Back to Home** button to cancel their registration and return to the home page.

### Login Screen

Users must log in before making any payments. The login screen requires the user to fill in the following information:

- **Username**
- **Account Number**
- **Password**

Once all the required information is provided, the user can click the **Login** button and will be taken to the payment screen. The user can click the **Back to Home** button to return to the home page.

### Submit Payment Screen

To complete a payment, users must provide the following information:

- **Amount**
- **Currency**
- **Account Number**
- **SWIFT Code**
- **Payment Reference**

The user can click the **Pay Now** button to process their payment. The user can click the **Back to Home** button to return to the home page.

### Employee Management Screen

This screen allows employees to:

- **View Transactions**: See a list of all transactions.
- **Verify Payments**: Confirm payments made by users.
- **Manage User Accounts**: Assist with user queries and account management.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **HTML5 & CSS3**: Markup and styling for the web pages.
- **Node.js**: Runtime for the server-side application.
- **npm**: Package manager for managing project dependencies.
- **Vite**: Build tool for modern web projects.

## Required for Usage

- **Visual Studio Code**

## Installation and Setup

1. Download and install Visual Studio Code.
2. Clone the repository.
3. Open the project in Visual Studio Code.
4. Open a new terminal, navigate to the server directory, and run the command: `npm install`.
5. Open another terminal, navigate to the client directory, and run the command: `npm install`.
6. The server needs to be running before the client. Use the command to run the server: `npm start`.
7. Use the command to run the client: `npm run dev`.
8. Once the server is running and you run the client, it will give you a link. Click that link to access the app.
