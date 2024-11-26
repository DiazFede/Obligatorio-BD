from datetime import datetime
from flask import Flask, jsonify, request
import mysql.connector
from config import Config
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        database=app.config['MYSQL_DATABASE'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD']
    )

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    ci = data.get('ci')
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    fecha_nacimiento_str = data.get('fecha_nacimiento')
    telefono = data.get('telefono')
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    if not all([ci, nombre, apellido, fecha_nacimiento_str, correo, contrasena]):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    try:
        fecha_nacimiento = datetime.strptime(fecha_nacimiento_str, '%d-%m-%Y').strftime('%Y-%m-%d')
        print("Fecha de nacimiento convertida:", fecha_nacimiento)
    except ValueError:
        return jsonify({"message": "Formato de fecha inválido, use DD-MM-YYYY"}), 400

    hashed_password = generate_password_hash(contrasena)

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono, correo_electronico, contraseña)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (ci, nombre, apellido, fecha_nacimiento, telefono, correo, hashed_password))
        conn.commit()
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al registrar usuario: {err}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    if not correo or not contrasena:
        return jsonify({"message": "Correo y contraseña requeridos"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM alumnos WHERE correo_electronico = %s", (correo,))
        user = cursor.fetchone()

        if user and check_password_hash(user['contraseña'], contrasena):
            return jsonify({"data": user}), 200
        else:
            return jsonify({"message": "Correo o contraseña incorrectos."}), 401
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error en el login: {err}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/actividades', methods=['GET', 'POST'])
def actividades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute("SELECT * FROM actividades")
        actividades = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(actividades)
    
    elif request.method == 'POST':
        data = request.get_json()

        if 'descripcion' not in data or 'costo' not in data or 'restriccion_edad' not in data:
            return jsonify({"message": "Faltan parámetros requeridos"}), 400
        
        cursor.execute(
            "INSERT INTO actividades (descripcion, costo, restriccion_edad) VALUES (%s, %s, %s)", 
            (data['descripcion'], data['costo'], data['restriccion_edad'])
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Actividad creada exitosamente."}), 201

@app.route('/actividades/<int:id>', methods=['PUT', 'DELETE'])
def actividad_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.get_json()
        if 'descripcion' not in data or 'costo' not in data or 'restriccion_edad' not in data:
            return jsonify({"message": "Faltan parámetros requeridos"}), 400
        
        cursor.execute(
            "UPDATE actividades SET descripcion = %s, costo = %s, restriccion_edad = %s WHERE id = %s", 
            (data['descripcion'], data['costo'], data['restriccion_edad'], id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Actividad actualizada exitosamente."})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM actividades WHERE id = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Actividad eliminada exitosamente."})

@app.route('/equipamiento', methods=['GET', 'POST'])
def equipamiento():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute("SELECT * FROM equipamiento")
        equipamiento = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(equipamiento)
    
    elif request.method == 'POST':
        data = request.get_json()
        cursor.execute("INSERT INTO equipamiento (id_actividad, descripcion, costo) VALUES (%s, %s, %s)", (data['id_actividad'], data['descripcion'], data['costo']))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Equipamiento creado exitosamente."}), 201

@app.route('/equipamiento/<int:id>', methods=['PUT', 'DELETE'])
def equipamiento_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.get_json()
        cursor.execute("UPDATE equipamiento SET id_actividad = %s, descripcion = %s, costo = %s WHERE id = %s", (data['id_actividad'], data['descripcion'], data['costo'], id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Equipamiento actualizado exitosamente."})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM equipamiento WHERE id = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Equipamiento eliminado exitosamente."})

@app.route('/instructores', methods=['GET', 'POST'])
def instructores():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM instructores")
        instructores = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(instructores)
    
    elif request.method == 'POST':
        data = request.get_json()
        cursor.execute(
            "INSERT INTO instructores (ci, nombre, apellido, experiencia, disponibilidad) VALUES (%s, %s, %s, %s, %s)",
            (data['ci'], data['nombre'], data['apellido'], data['experiencia'], data['disponibilidad'])
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Instructor creado exitosamente."}), 201

@app.route('/instructores/<int:ci>', methods=['PUT', 'DELETE'])
def instructor_by_ci(ci):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.get_json()
        
        cursor.execute(
            """
            UPDATE instructores 
            SET nombre = %s, apellido = %s, disponibilidad = %s, experiencia = %s 
            WHERE ci = %s
            """,
            (data['nombre'], data['apellido'], data['disponibilidad'], data['experiencia'], ci)
        )
        print(data)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Instructor actualizado exitosamente."})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM instructores WHERE ci = %s", (ci,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Instructor eliminado exitosamente."})

@app.route('/turnos', methods=['GET', 'POST'])
def turnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute("SELECT * FROM turnos")
        turnos = cursor.fetchall()
        
        for turno in turnos:
            if isinstance(turno['hora_inicio'], timedelta):
                turno['hora_inicio'] = str(turno['hora_inicio'])  # o  usar .total_seconds()
            if isinstance(turno['hora_fin'], timedelta):
                turno['hora_fin'] = str(turno['hora_fin'])  # o  usar .total_seconds()

        cursor.close()
        conn.close()
        return jsonify(turnos)
    
    elif request.method == 'POST':
        data = request.get_json()
        cursor.execute("INSERT INTO turnos (hora_inicio, hora_fin) VALUES (%s, %s)", (data['hora_inicio'], data['hora_fin']))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Turno creado exitosamente."}), 201

@app.route('/turnos/<int:id>', methods=['PUT', 'DELETE'])
def turno_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.get_json()
        cursor.execute("UPDATE turnos SET hora_inicio = %s, hora_fin = %s WHERE id = %s", (data['hora_inicio'], data['hora_fin'], id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Turno actualizado exitosamente."})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM turnos WHERE id = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Turno eliminado exitosamente."})

@app.route('/clase', methods=['GET', 'POST'])
def clases():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM clase")
        clases = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(clases)

    elif request.method == 'POST':
        data = request.get_json()
        cursor.execute(
            "INSERT INTO clase (ci_instructor, id_actividad, id_turno, dictada) VALUES (%s, %s, %s, %s)",
            (data['ci_instructor'], data['id_actividad'], data['id_turno'], data['dictada'])
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Clase creada exitosamente."}), 201

@app.route('/clase/<int:id>', methods=['PUT', 'DELETE'])
def clase_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.get_json()
        cursor.execute(
            "UPDATE clase SET ci_instructor = %s, id_actividad = %s, id_turno = %s, dictada = %s WHERE id = %s",
            (data['ci_instructor'], data['id_actividad'], data['id_turno'], data['dictada'], id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Clase actualizada exitosamente."})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM clase WHERE id = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Clase eliminada exitosamente."})

@app.route('/alumnos', methods=['GET', 'POST'])
def alumnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM alumnos")
        alumnos = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(alumnos)

    elif request.method == 'POST':
        data = request.get_json()
        cursor.execute(
            "INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono, correo_electronico) VALUES (%s, %s, %s, %s, %s, %s)",
            (data['ci'], data['nombre'], data['apellido'], data['fecha_nacimiento'], data['telefono'], data['correo_electronico'])
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Alumno creado exitosamente."}), 201

@app.route('/alumnos/<int:ci>', methods=['PUT', 'DELETE'])
def alumno_by_id(ci):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.get_json()
        cursor.execute(
            "UPDATE alumnos SET nombre = %s, apellido = %s, fecha_nacimiento = %s, telefono = %s, correo_electronico = %s WHERE ci = %s",
            (data['nombre'], data['apellido'], data['fecha_nacimiento'], data['telefono'], data['correo_electronico'], ci)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Alumno actualizado exitosamente."})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM alumnos WHERE ci = %s", (ci,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Alumno eliminado exitosamente."})
    
@app.route('/alumno/<int:ci>', methods=['GET'])
def get_alumno_by_ci(ci):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM alumnos WHERE ci = %s", (ci,))
        alumno = cursor.fetchone()

        if alumno:
            return jsonify(alumno)
        else:
            return jsonify({"message": "Alumno no encontrado"}), 404
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al obtener el alumno: {err}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/alumno_clase', methods=['GET', 'POST'])
def alumno_clase():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM alumno_clase")
        alumno_clase = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(alumno_clase)

    elif request.method == 'POST':
        data = request.get_json()
        cursor.execute(
            "INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento) VALUES (%s, %s, %s)",
            (data['id_clase'], data['ci_alumno'], data['id_equipamiento'])
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Relación alumno-clase creada exitosamente."}), 201

@app.route('/alumno_clase/<int:id_clase>/<int:ci_alumno>', methods=['DELETE', 'PUT'])
def alumno_clase_by_id(id_clase, ci_alumno):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'DELETE':
        cursor.execute(
            "DELETE FROM alumno_clase WHERE id_clase = %s AND ci_alumno = %s",
            (id_clase, ci_alumno)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Relación alumno-clase eliminada exitosamente."})

    elif request.method == 'PUT':
        data = request.get_json()
        id_equipamiento = data.get('id_equipamiento')  

        cursor.execute(
            "UPDATE alumno_clase SET id_equipamiento = %s WHERE id_clase = %s AND ci_alumno = %s",
            (id_equipamiento, id_clase, ci_alumno)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Relación alumno-clase actualizada exitosamente."})


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

@app.route('/verify_class_availability', methods=['POST'])
def verify_class_availability():
    data = request.get_json()
    id_turno = data.get('id_turno')
    ci_instructor = data.get('ci_instructor')
    ci_alumno = data.get('ci_alumno')
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT * FROM clase 
            WHERE ci_instructor = %s AND id_turno = %s
        """, (ci_instructor, id_turno))
        if cursor.fetchone():
            return jsonify({"message": "El instructor ya tiene una clase en este turno"}), 400

        cursor.execute("""
            SELECT * FROM alumno_clase ac
            JOIN clase c ON ac.id_clase = c.id
            WHERE ac.ci_alumno = %s AND c.id_turno = %s
        """, (ci_alumno, id_turno))
        if cursor.fetchone():
            return jsonify({"message": "El alumno ya está inscrito en otra clase en este turno"}), 400

        return jsonify({"message": "Disponibilidad verificada"}), 200
    finally:
        cursor.close()
        conn.close()

@app.route('/reportes/ingresos_actividades', methods=['GET'])
def reportar_ingresos_actividades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT a.descripcion, SUM(a.costo + IFNULL(e.costo, 0)) AS ingresos
        FROM actividades a
        LEFT JOIN equipamiento e ON a.id = e.id_actividad
        GROUP BY a.descripcion
    """)
    reportes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(reportes)

@app.route('/reportes/turnos_con_mas_clases', methods=['GET'])
def reportar_turnos_mas_clases():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT t.hora_inicio, t.hora_fin, COUNT(c.id) AS total_clases
        FROM turnos t
        JOIN clase c ON t.id = c.id_turno
        WHERE c.dictada = TRUE
        GROUP BY t.hora_inicio, t.hora_fin
        ORDER BY total_clases DESC
    """)
    reportes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(reportes)

@app.route('/alumno_clase/rent', methods=['POST'])
def rent_equipment_to_alumno():
    data = request.get_json()
    id_equipamiento = data.get('idEquipamiento')
    ci_alumno = data.get('ciAlumno')
    id_clase = data.get('idClase')

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento) 
            VALUES (%s, %s, %s)
        """, (id_clase, ci_alumno, id_equipamiento))
        conn.commit()
        return jsonify({"message": "Equipamiento alquilado exitosamente."}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al alquilar equipamiento: {err}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/alumno_clase/release', methods=['POST'])
def release_equipment_from_alumno():
    data = request.get_json()
    id_equipamiento = data.get('idEquipamiento')
    ci_alumno = data.get('ciAlumno')
    id_clase = data.get('idClase')

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            DELETE FROM alumno_clase 
            WHERE id_clase = %s AND ci_alumno = %s AND id_equipamiento = %s
        """, (id_clase, ci_alumno, id_equipamiento))
        conn.commit()
        return jsonify({"message": "Equipamiento liberado exitosamente."}), 200
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al liberar equipamiento: {err}"}), 500
    finally:
        cursor.close()
        conn.close()
      
@app.route('/adminlogin', methods=['POST'])
def admin_login():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    if not correo or not contrasena:
        return jsonify({"message": "Correo y contraseña requeridos"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM admin WHERE correo = %s", (correo,))
        admin = cursor.fetchone()

        if admin and admin['contraseña'] == contrasena:
            return jsonify({"message": "Inicio de sesión de admin exitoso."})
        else:
            return jsonify({"message": "Correo o contraseña de admin incorrectos."}), 401
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error en el login de admin: {err}"}), 500
    finally:
        cursor.close()
        conn.close()