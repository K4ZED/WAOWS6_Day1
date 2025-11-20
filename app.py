from flask import (
    Flask,
    jsonify,
    request,
    render_template,
    session,
    redirect,
    url_for,
)
from flask_cors import CORS
from functools import wraps
import bcrypt

from config.db import query_all, execute

app = Flask(__name__)
CORS(app)
app.secret_key = "waow_workshop_secret_key"  # ganti ke string random panjang


def hash_password(plain_password: str) -> str:
    return bcrypt.hashpw(
        plain_password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")


def check_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login_page"))
        return f(*args, **kwargs)

    return wrapper


def api_login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"error": "Login required"}), 401
        return f(*args, **kwargs)

    return wrapper


@app.route("/")
@login_required
def index():
    return render_template("index.html")


@app.route("/login")
def login_page():
    if "user_id" in session:
        return redirect(url_for("index"))
    return render_template("login.html")


@app.route("/register")
def register_page():
    if "user_id" in session:
        return redirect(url_for("index"))
    return render_template("register.html")


@app.route("/customers")
@login_required
def customers_page():
    return render_template("customers.html")


@app.route("/products")
@login_required
def products_page():
    return render_template("products.html")


@app.route("/transactions")
@login_required
def transactions_page():
    return render_template("transactions.html")


@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.get_json()
    email = data.get("Email") or data.get("email")
    password = data.get("Password") or data.get("password")

    if not email or not password:
        return jsonify({"error": "Email dan password wajib diisi."}), 400

    hashed = hash_password(password)

    sql = """
        INSERT INTO users (Email, Password, IsActive)
        VALUES (%s, %s, 1)
    """
    try:
        user_id = execute(sql, (email, hashed))
    except Exception:
        return jsonify({"error": "Email sudah terdaftar."}), 409

    session["user_id"] = user_id
    session["user_email"] = email

    return jsonify({"message": "registered", "UserId": user_id, "Email": email}), 201


@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    email = data.get("Email") or data.get("email")
    password = data.get("Password") or data.get("password")

    if not email or not password:
        return jsonify({"error": "Email dan password wajib diisi."}), 400

    sql = "SELECT * FROM users WHERE Email = %s AND IsActive = 1"
    rows = query_all(sql, (email,))

    if not rows:
        return jsonify({"error": "Email tidak ditemukan / tidak aktif."}), 404

    user = rows[0]

    if not check_password(password, user["Password"]):
        return jsonify({"error": "Password salah."}), 401

    session["user_id"] = user["UserId"]
    session["user_email"] = user["Email"]

    return jsonify(
        {
            "message": "login_success",
            "UserId": user["UserId"],
            "Email": user["Email"],
        }
    )


@app.route("/api/logout", methods=["POST", "GET"])
@app.route("/api/logout", methods=["POST", "GET"])
def api_logout():
    session.clear()
    if request.method == "GET":
        return redirect(url_for("login_page"))
    return jsonify({"message": "logged_out"})

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login_page"))

@app.route("/api/me")
def api_me():
    if "user_id" not in session:
        return jsonify({"authenticated": False})
    return jsonify(
        {
            "authenticated": True,
            "UserId": session.get("user_id"),
            "Email": session.get("user_email"),
        }
    )


@app.route("/api/customers", methods=["GET"])
@api_login_required
def get_customers():
    rows = query_all("SELECT * FROM mall_customer ORDER BY CustomerID")
    return jsonify(rows)


@app.route("/api/customers", methods=["POST"])
@api_login_required
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
@api_login_required
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
@api_login_required
def delete_customer(customer_id):
    sql = "DELETE FROM mall_customer WHERE CustomerID=%s"
    execute(sql, (customer_id,))
    return jsonify({"message": "deleted"})


@app.route("/api/products", methods=["GET"])
@api_login_required
def get_products():
    rows = query_all("SELECT * FROM products ORDER BY ProductID")
    return jsonify(rows)


@app.route("/api/products", methods=["POST"])
@api_login_required
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
@api_login_required
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
@api_login_required
def delete_product(product_id):
    sql = "DELETE FROM products WHERE ProductID=%s"
    execute(sql, (product_id,))
    return jsonify({"message": "deleted"})


@app.route("/api/transactions")
@api_login_required
def get_transactions():
    sql = """
        SELECT
            t.TransactionID,
            t.CustomerID,
            t.TransactionDate,
            t.PaymentMethod,
            t.TotalAmount,
            (
                SELECT COALESCE(SUM(d.Quantity), 0)
                FROM transaction_details d
                WHERE d.TransactionID = t.TransactionID
            ) AS TotalItems
        FROM transactions t
        ORDER BY t.TransactionDate DESC
    """
    rows = query_all(sql)
    return jsonify(rows)


@app.route("/api/transactions", methods=["POST"])
@api_login_required
def create_transaction():
    data = request.get_json()
    customer_id = data.get("CustomerID")
    payment_method = data.get("PaymentMethod")
    items = data.get("Items", [])

    if not items:
        return jsonify({"error": "No items"}), 400

    total_items = 0
    total_amount = 0.0

    for item in items:
        qty = int(item.get("Quantity", 0))
        price = float(item.get("UnitPrice", 0))
        total_items += qty
        total_amount += qty * price

    tx_sql = """
        INSERT INTO transactions (CustomerID, TransactionDate, TotalAmount, PaymentMethod)
        VALUES (%s, NOW(), %s, %s)
    """
    tx_id = execute(tx_sql, (customer_id, total_amount, payment_method))

    detail_sql = """
        INSERT INTO transaction_details (TransactionID, ProductID, Quantity, UnitPrice, Subtotal)
        VALUES (%s, %s, %s, %s, %s)
    """

    for item in items:
        qty = int(item.get("Quantity", 0))
        price = float(item.get("UnitPrice", 0))
        subtotal = qty * price

        execute(
            detail_sql,
            (
                tx_id,
                item.get("ProductID"),
                qty,
                price,
                subtotal,
            ),
        )

        execute(
            "UPDATE products SET Stock = Stock - %s WHERE ProductID = %s",
            (qty, item.get("ProductID")),
        )

    return jsonify({"message": "created", "TransactionID": tx_id}), 201


@app.route("/api/transactions/<int:transaction_id>")
@api_login_required
def get_transaction_detail(transaction_id):
    header_sql = """
        SELECT
            t.TransactionID,
            t.CustomerID,
            t.TransactionDate,
            t.TotalAmount,
            t.PaymentMethod
        FROM transactions t
        WHERE t.TransactionID = %s
    """
    items_sql = """
        SELECT
            d.DetailID,
            d.ProductID,
            p.Name,
            d.Quantity,
            d.UnitPrice,
            d.Subtotal
        FROM transaction_details d
        JOIN products p ON d.ProductID = p.ProductID
        WHERE d.TransactionID = %s
    """

    header = query_all(header_sql, (transaction_id,))
    if not header:
        return jsonify({"error": "not found"}), 404

    items = query_all(items_sql, (transaction_id,))
    tx = header[0]
    tx["Items"] = items
    return jsonify(tx)


if __name__ == "__main__":
    app.run(debug=True)
