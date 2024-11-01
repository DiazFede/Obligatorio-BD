from flask import Flask, jsonify, request
import mysql.connector
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        database=app.config['MYSQL_DATABASE'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD']
    )

# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data['correo']
    contrasena = data['contrasena']
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alumnos WHERE correo_electronico = %s AND contrasena = %s", (correo, contrasena))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({"message": "Inicio de sesión exitoso."})
    else:
        return jsonify({"message": "Correo o contraseña incorrectos."}), 401

# Actividades
@app.route('/actividades', methods=['GET'])
def get_actividades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM actividades")
    actividades = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(actividades)

@app.route('/actividades', methods=['POST'])
def create_actividad():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO actividades (descripcion, costo) VALUES (%s, %s)", (data['descripcion'], data['costo']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Actividad creada exitosamente."}), 201

@app.route('/actividades/<int:id>', methods=['PUT'])
def update_actividad(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE actividades SET descripcion = %s, costo = %s WHERE id = %s", (data['descripcion'], data['costo'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Actividad actualizada exitosamente."})

@app.route('/actividades/<int:id>', methods=['DELETE'])
def delete_actividad(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM actividades WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Actividad eliminada exitosamente."})

# Equipamiento
@app.route('/equipamiento', methods=['GET'])
def get_equipamiento():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipamiento")
    equipamiento = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(equipamiento)

@app.route('/equipamiento', methods=['POST'])
def create_equipamiento():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO equipamiento (id_actividad, descripcion, costo) VALUES (%s, %s, %s)", (data['id_actividad'], data['descripcion'], data['costo']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Equipamiento creado exitosamente."}), 201

@app.route('/equipamiento/<int:id>', methods=['PUT'])
def update_equipamiento(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE equipamiento SET id_actividad = %s, descripcion = %s, costo = %s WHERE id = %s", (data['id_actividad'], data['descripcion'], data['costo'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Equipamiento actualizado exitosamente."})

@app.route('/equipamiento/<int:id>', methods=['DELETE'])
def delete_equipamiento(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM equipamiento WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Equipamiento eliminado exitosamente."})

# Instructores
@app.route('/instructores', methods=['GET'])
def get_instructores():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM instructores")
    instructores = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(instructores)

@app.route('/instructores', methods=['POST'])
def create_instructor():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO instructores (ci, nombre, apellido) VALUES (%s, %s, %s)", (data['ci'], data['nombre'], data['apellido']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Instructor creado exitosamente."}), 201

@app.route('/instructores/<int:ci>', methods=['PUT'])
def update_instructor(ci):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE instructores SET nombre = %s, apellido = %s WHERE ci = %s", (data['nombre'], data['apellido'], ci))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Instructor actualizado exitosamente."})

@app.route('/instructores/<int:ci>', methods=['DELETE'])
def delete_instructor(ci):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM instructores WHERE ci = %s", (ci,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Instructor eliminado exitosamente."})

# Turnos
from datetime import timedelta

@app.route('/turnos', methods=['GET'])
def get_turnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM turnos")
    turnos = cursor.fetchall()
    
    # Convertir tiempos a un formato JSON serializable
    for turno in turnos:
        if isinstance(turno['hora_inicio'], timedelta):
            turno['hora_inicio'] = str(turno['hora_inicio'])  # o  usar .total_seconds()
        if isinstance(turno['hora_fin'], timedelta):
            turno['hora_fin'] = str(turno['hora_fin'])  # o  usar .total_seconds()

    cursor.close()
    conn.close()
    return jsonify(turnos)


@app.route('/turnos', methods=['POST'])
def create_turno():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO turnos (hora_inicio, hora_fin) VALUES (%s, %s)", (data['hora_inicio'], data['hora_fin']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Turno creado exitosamente."}), 201

@app.route('/turnos/<int:id>', methods=['PUT'])
def update_turno(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE turnos SET hora_inicio = %s, hora_fin = %s WHERE id = %s", (data['hora_inicio'], data['hora_fin'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Turno actualizado exitosamente."})

@app.route('/turnos/<int:id>', methods=['DELETE'])
def delete_turno(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM turnos WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Turno eliminado exitosamente."})

# Clases
@app.route('/clases', methods=['GET'])
def get_clases():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clase")
    clases = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(clases)

@app.route('/clases', methods=['POST'])
def create_clase():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO clase (ci_instructor, id_actividad, id_turno, dictada) VALUES (%s, %s, %s, %s)", (data['ci_instructor'], data['id_actividad'], data['id_turno'], data['dictada']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Clase creada exitosamente."}), 201

@app.route('/clases/<int:id>', methods=['PUT'])
def update_clase(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE clase SET ci_instructor = %s, id_actividad = %s, id_turno = %s, dictada = %s WHERE id = %s", (data['ci_instructor'], data['id_actividad'], data['id_turno'], data['dictada'], id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Clase actualizada exitosamente."})

@app.route('/clases/<int:id>', methods=['DELETE'])
def delete_clase(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM clase WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Clase eliminada exitosamente."})

# Alumnos
@app.route('/alumnos', methods=['GET'])
def get_alumnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alumnos")
    alumnos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(alumnos)

@app.route('/alumnos', methods=['POST'])
def create_alumno():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento) VALUES (%s, %s, %s, %s)", (data['ci'], data['nombre'], data['apellido'], data['fecha_nacimiento']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Alumno creado exitosamente."}), 201

@app.route('/alumnos/<int:ci>', methods=['PUT'])
def update_alumno(ci):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE alumnos SET nombre = %s, apellido = %s, fecha_nacimiento = %s WHERE ci = %s", (data['nombre'], data['apellido'], data['fecha_nacimiento'], ci))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Alumno actualizado exitosamente."})

@app.route('/alumnos/<int:ci>', methods=['DELETE'])
def delete_alumno(ci):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM alumnos WHERE ci = %s", (ci,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Alumno eliminado exitosamente."})

# Alumno_Clase
@app.route('/alumno_clase', methods=['GET'])
def get_alumno_clase():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alumno_clase")
    alumno_clase = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(alumno_clase)

@app.route('/alumno_clase', methods=['POST'])
def create_alumno_clase():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento) VALUES (%s, %s, %s)", (data['id_clase'], data['ci_alumno'], data['id_equipamiento']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Alumno asignado a clase exitosamente."}), 201

@app.route('/alumno_clase', methods=['DELETE'])
def delete_alumno_clase():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM alumno_clase WHERE id_clase = %s AND ci_alumno = %s", (data['id_clase'], data['ci_alumno']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Alumno removido de la clase exitosamente."})

@app.route('/reportes/ingresos_actividades', methods=['GET'])
def reportar_ingresos_actividades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT a.descripcion, SUM(e.costo) AS ingresos
        FROM actividades a
        LEFT JOIN equipamiento e ON a.id = e.id_actividad
        GROUP BY a.descripcion
    """)
    reportes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(reportes)

@app.route('/reportes/alumnos_por_actividad', methods=['GET'])
def reportar_alumnos_por_actividad():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT a.descripcion, COUNT(ac.ci_alumno) AS total_alumnos
        FROM actividades a
        LEFT JOIN alumno_clase ac ON a.id = ac.id_clase
        GROUP BY a.descripcion
    """)
    reportes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(reportes)

if __name__ == '__main__':
    app.run(debug=True)
