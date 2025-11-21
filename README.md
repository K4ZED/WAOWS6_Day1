# Flask Dashboard - Customer & Product Management System

A web-based dashboard application built with Flask and MySQL for managing customers, products, users, and transactions.

## Features

- **Customer Management**: Complete CRUD operations for customer data
- **Product Management**: Add, view, update, and delete product information
- **User Management**: Manage system users with full CRUD functionality
- **Transaction System**: Process and record customer transactions
- **Dashboard Interface**: Clean and intuitive web interface for data management

## Tech Stack

- **Backend**: Python Flask
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript (Vanilla)

## Prerequisites

Before running this application, make sure you have the following installed:

- Python 3.7 or higher
- MySQL Server
- pip (Python package manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure database**
   
   Create a `.env` file in the root directory and add your database configuration:
   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_DB=your_database_name
   SECRET_KEY=your_secret_key
   ```

5. **Initialize database tables**
   ```bash
   python init_db.py  # Or run your database migration script
   ```

## Running the Application

1. **Start the Flask development server**
   ```bash
   python app.py
   # or
   flask run
   ```

2. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

```
project-root/
│
├── __pycache__/          # Python cache files
├── venv/                 # Virtual environment
│
├── config/              # Configuration files
│   ├── __pycache__/
│   ├── __init__.py
│   └── db.py            # Database configuration
│
├── routes/              # Route handlers (Blueprints)
│   ├── customers.py     # Customer CRUD routes
│   ├── products.py      # Product CRUD routes
│   └── transactions.py  # Transaction routes
│
├── static/              # Static files
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── js/              # JavaScript files
│       ├── auth.js
│       ├── customers.js
│       ├── home.js
│       ├── products.js
│       ├── transactions.js
│       └── users.js
│
├── templates/           # HTML templates
│   ├── admin_login.html
│   ├── base.html        # Base template
│   ├── customers.html
│   ├── index.html       # Home/Dashboard
│   ├── login.html
│   ├── products.html
│   ├── register.html
│   ├── transactions.html
│   └── users.html
│
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── app.py              # Main application file
├── README.md           # This file
└── requirements.txt    # Python dependencies
```

## Database Schema

### Users Table
- `UserId` (Primary Key, INT)
- `Email` (VARCHAR(255), NN)
- `Password` (VARCHAR(255), NN - hashed)
- `Roles` (VARCHAR - for role management: admin/user)
- `IsActive` (BOOLEAN, NN)
- `created_at` (DATETIME)

### mall_customer Table
- `CustomerID` (Primary Key, INT)
- `UserId` (Foreign Key → users.UserId, INT)
- `Gender` (VARCHAR(10), NN)
- `Age` (INT, NN)
- `Annual_Income` (INT, NN)
- `Spending_Score` (INT, NN)
- `created_at` (DATETIME)

### products Table
- `ProductID` (Primary Key, INT)
- `CategoryID` (Foreign Key → product_categories.CategoryID, INT, NN)
- `Name` (VARCHAR(100), NN)
- `Price` (DECIMAL(10,2), NN)
- `Stock` (INT, NN)
- `created_at` (DATETIME)

### product_categories Table
- `CategoryID` (Primary Key, INT)
- `Name` (VARCHAR(100), NN)
- `Description` (TEXT)

### transactions Table
- `TransactionID` (Primary Key, INT)
- `CustomerID` (Foreign Key → mall_customer.CustomerID, INT, NN)
- `TransactionDate` (DATETIME)
- `TotalAmount` (DECIMAL(12,2), NN)
- `PaymentMethod` (VARCHAR(50))

### transaction_details Table
- `DetailID` (Primary Key, INT)
- `TransactionID` (Foreign Key → transactions.TransactionID, INT, NN)
- `ProductID` (Foreign Key → products.ProductID, INT, NN)
- `Quantity` (INT, NN)
- `UnitPrice` (DECIMAL(10,2), NN)
- `Subtotal` (DECIMAL(12,2), NN)

## Entity Relationships

- One **User** can have one **Customer** profile (1:1)
- One **Customer** can have many **Transactions** (1:N)
- One **Transaction** can have many **Transaction Details** (1:N)
- One **Product** can appear in many **Transaction Details** (1:N)
- One **Category** can have many **Products** (1:N)

## API Endpoints

### Customers
- `GET /customers` - Get all customers
- `GET /customers/<id>` - Get specific customer
- `POST /customers` - Create new customer
- `PUT /customers/<id>` - Update customer
- `DELETE /customers/<id>` - Delete customer

### Products
- `GET /products` - Get all products
- `GET /products/<id>` - Get specific product
- `POST /products` - Create new product
- `PUT /products/<id>` - Update product
- `DELETE /products/<id>` - Delete product

### Users
- `GET /users` - Get all users
- `GET /users/<id>` - Get specific user
- `POST /users` - Create new user
- `PUT /users/<id>` - Update user
- `DELETE /users/<id>` - Delete user

### Transactions
- `GET /transactions` - Get all transactions
- `GET /transactions/<id>` - Get specific transaction
- `POST /transactions` - Create new transaction

## Usage

1. **Login** to the dashboard with your user credentials
2. **Navigate** through the sidebar menu to access different sections
3. **Manage Data** using the CRUD operations available in each section
4. **Create Transactions** by selecting a customer and product, then entering quantity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/project-name](https://github.com/yourusername/project-name)

## Acknowledgments

- Flask Documentation
- MySQL Documentation