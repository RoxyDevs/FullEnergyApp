from flask import Flask, render_template, jsonify
import database #módulo para interactuar con MySQL

app = Flask(__name__)

# Ruta principal, renderiza la página index.html
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para obtener las estaciones de carga
@app.route('/stations')
def get_stations():
    try:
        # Obtiene las estaciones de carga desde la base de datos
        stations = database.get_all_stations()
        # Devuelve los datos en formato JSON
        return jsonify(stations)
    except Exception as e:
        # Manejo de errores: si hay un error al obtener las estaciones, devuelve un mensaje de error
        return jsonify({'error': str(e)}), 500

if __name__== '__main__':
    app.run(debug=True)