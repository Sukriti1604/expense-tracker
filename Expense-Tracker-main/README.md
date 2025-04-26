# Expense Tracker - ExpenseFlow

# Developer: Sudarshan Date

## Overview

This is a simple Expense Tracker application that helps users manage their expenses efficiently. It allows users to add, delete and download expenses or incomes while providing a summary of their spending.

## Features

- Add new expenses with details like amount, category, and date.
- Add new income with details like amount, source, and date.
- Delete existing expenses.
- Delete existing income.
- Download Income details or Expense details.
- View a summary of expenses by category or date range.
- User-friendly interface.

## Technologies Used

- Frontend: React.js, tailwindcss, react-icons, vite
- Backend: Node.js, Express.js, MVC Architecture
- Database: MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:SudarshanProCoder/Expense-Tracker.git
   ```
2. Navigate to the project directory - Frontend:
   ```bash
   cd Expense-Tracker/frontend/expense-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run dev
   ```
5. Navigate to the project directory - Backend:
   ```bash
   cd Expense-Tracker/backend
   ```
6. Install dependencies:
   ```bash
   npm install
   ```
7. Add URLS in .env file
   ```bash
   PORT=8000
   MONGO_URI=your_atlas_url
   JWT_SECRET=your_jwt_key
   CLIENT_URL=client_url
   ```
8. Start the application:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to ` http://localhost:5173/`.
2. Start adding your incomes or expenses and manage them effectively.

## Output

Below is an example of the application's interface:

![Expense Tracker Output](./images/img1.png)
![Expense Tracker Output](./images/img2.png)
![Expense Tracker Output](./images/img3.png)
![Expense Tracker Output](./images/img4.png)
![Expense Tracker Output](./images/img5.png)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
