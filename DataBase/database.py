import mysql.connector

# Configura tu conexión a MySQL aquí (reemplaza con tus credenciales)
mydb = mysql.connector.connect(
    host = "localhost",
    user ="tu_usuario",
    password = "tu_contraseña",
    database ="tu_base_de_datos"
)

# Función para obtener todas las estaciones de carga de la base de datos
def get_all_stations():
    # Crea un cursor para ejecutar consultas SQL
    cursor = mydb.cursor(dictionary=True) # Para obtener resultados como diccionarios
    # Ejecuta la consulta SQL para obtener todas las estaciones
    cursor.execute("SELECT * FROM estaciones")
    # Obtiene los resultados de la consulta
    stations = cursor.fetchall()
    # Devuelve los resultados
    return stations