import json
from flask import Flask, render_template, request, session, redirect, url_for, abort
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='asel',
                             password='db_asel123_',
                             db='asel_db',
                             charset='utf8',
                             cursorclass=pymysql.cursors.DictCursor)
app = Flask(__name__)
app.secret_key = '<5\x0e.\xc5\x9f\\\x1cf\r*\x94\xc3u\xdf\xf8\xa1}\xcbt\xfa\x96cG'


@app.route('/api/countries', methods=['GET'])
def hello_world():
    with connection.cursor() as cursor:
        cursor.execute(
            "select * from countries;")
        data = json.dumps(cursor.fetchall())
        return data


@app.route('/', methods=['GET'])
def index():
    if not 'email' in session:
        return redirect(url_for('login'))

    return render_template('index.html', user=session['email'])


@app.route('/login', methods=['POST', 'GET'])
def login():
    if 'email' in session:
        return redirect(url_for('index'))

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        with connection.cursor() as cursor:
            cursor.execute("select `email` from `users` where \
            `email`=%s and `password`=%s", (email, password))
            user = cursor.fetchone()
            if user:
                session['email'] = user['email']
                return redirect(url_for('index'))
            else:
                return json.dumps({'error': 'E-Mail or Password is not correct'})
    else:
        return render_template('login.html')


@app.route('/signup', methods=['POST'])
def signup():
    name = request.form['name']
    email = request.form['email']
    country = request.form['country']
    password = request.form['password']
    password2 = request.form['password2']
    if password != password2:
        abort(401)

    if not name or not email or not country:
        abort(401)

    with connection.cursor() as cursor:
        cursor.execute("select `email` from `users` where email=%s", (email,))
        result = cursor.fetchone()
        if result:
            return json.dumps({'error': 'This user already exists'})
        cursor.execute(
            "insert into `users` (`email`, `name`, `country`, `password`) \
            VALUES (%s, %s, %s, %s)", (email, name, country, password))
        connection.commit()
        session['email'] = email
        return redirect(url_for('index'))


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('email', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
