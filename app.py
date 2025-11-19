from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from config.db import query_all, execute

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/customers")
def customers_page():
    return render_template("customers.html")

@app.route("/products")
def products_page():
    return render_template("products.html")

@app.route("/api/customers", methods=["GET"])
def get_customers():
    rows = query_all("SELECT * FROM mall_customer ORDER BY CustomerID")
    return jsonify(rows)

@app.route("/api/customers", methods=["POST"])
def create_customer():
    data = request.get_json()
    sql = """
        INSERT INTO mall_customer (Gender, Age, Annual_Income, Spending_Score)
        VALUES (%s, %s, %s, %s)
    """
    params = (
        data.get("Gender"),
        data.get("Age"),
        data.get("Annual_Income"),
        data.get("Spending_Score"),
    )
    new_id = execute(sql, params)
    return jsonify({"CustomerID": new_id}), 201

@app.route("/api/customers/<int:customer_id>", methods=["PUT"])
def update_customer(customer_id):
    data = request.get_json()
    sql = """
        UPDATE mall_customer
        SET Gender=%s, Age=%s, Annual_Income=%s, Spending_Score=%s
        WHERE CustomerID=%s
    """
    params = (
        data.get("Gender"),
        data.get("Age"),
        data.get("Annual_Income"),
        data.get("Spending_Score"),
        customer_id,
    )
    execute(sql, params)
    return jsonify({"message": "updated"})

@app.route("/api/customers/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    sql = "DELETE FROM mall_customer WHERE CustomerID=%s"
    execute(sql, (customer_id,))
    return jsonify({"message": "deleted"})

@app.route("/api/products", methods=["GET"])
def get_products():
    rows = query_all("SELECT * FROM products ORDER BY ProductID")
    return jsonify(rows)

@app.route("/api/products", methods=["POST"])
def create_product():
    data = request.get_json()
    sql = """
        INSERT INTO products (CategoryID, Name, Price, Stock)
        VALUES (%s, %s, %s, %s)
    """
    params = (
        data.get("CategoryID"),
        data.get("Name"),
        data.get("Price"),
        data.get("Stock"),
    )
    new_id = execute(sql, params)
    return jsonify({"ProductID": new_id}), 201

@app.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json()
    sql = """
        UPDATE products
        SET CategoryID=%s, Name=%s, Price=%s, Stock=%s
        WHERE ProductID=%s
    """
    params = (
        data.get("CategoryID"),
        data.get("Name"),
        data.get("Price"),
        data.get("Stock"),
        product_id,
    )
    execute(sql, params)
    return jsonify({"message": "updated"})

@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    sql = "DELETE FROM products WHERE ProductID=%s"
    execute(sql, (product_id,))
    return jsonify({"message": "deleted"})

if __name__ == "__main__":
    app.run(debug=True)
