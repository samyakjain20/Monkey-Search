from api import app

if __name__ == '__main__':
    app.run(host='localhost', port=7200, debug=True, threaded=True)
