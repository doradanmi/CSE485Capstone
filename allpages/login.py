from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory, send_file
import mysql.connector

app = Flask(__name__)

app.static_folder = 'static'
app.secret_key = 'key'

# Database configuration
db = mysql.connector.connect(
    host='utmlogins.cxi3a3hhwnkb.us-west-2.rds.amazonaws.com',
    user='UTMxyz9856',
    password='A7nHQhUuurDs-T2!',
    database='UTMLogins'
)
cursor = db.cursor()


@app.route('/')
def login_page():
    return render_template('login.html')


@app.route('/capstone')
def capstone_page():
    return render_template('capstone.html')


@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    query = f"SELECT * FROM Logins where usernames = '{username}' AND password = '{password}'"
    cursor.execute(query)
    user = cursor.fetchone()

    # for testing
    if username == 'testing' and password == 'password123!':
        flash(f"Logged in as {username}")
        return redirect(url_for('capstone_page'))
    else:
        flash("fail", 'Invalid username or password')
        return redirect(url_for('login_page'))

# get capstone.html returns send file ../Mapping/dist/index.html


@app.route('/flights/<path:path>')
def send_file_flights(path):
    print(path)
    return send_from_directory('../Mapping/dist', path)


@app.route('/<path:path>')
def send_file(path):
    return send_from_directory('templates', path)


if __name__ == '__main__':
    app.run(debug=True)
