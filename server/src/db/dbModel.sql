CREATE DATABASE MediCitas;
use MediCitas;

-- -----CREATING ENUM TYPES--------
CREATE TYPE tipo_documento_enum AS ENUM (
    'Tarjeta de identidad',
    'Cedula de ciudadania'
);

CREATE TYPE sexo_enum AS ENUM (
    'Masculino',
    'Femenino'
);

CREATE TYPE estado_cita_enum AS ENUM (
    'Agendada',
    'Cancelada',
    'Completada',
    'No asistio'
);

-- SIMPLE TABLES
CREATE TABLE Paciente (
    paciente_id SERIAL PRIMARY KEY,
    nombre_paciente VARCHAR(50),
    apellidos_paciente VARCHAR(60),
    correo_paciente VARCHAR(50),
    telefono_paciente VARCHAR(20),
    tipo_documento_paciente tipo_documento_enum,
    documento_paciente VARCHAR(20),
    fecha_nacimiento_paciente DATE,
    sexo_paciente sexo_enum,
    direccion_paciente VARCHAR(40),
    fecha_vinculacion_paciente DATE,

    -- LOGIC CONSTRAINTS
    CONSTRAINT unique_documento_paciente UNIQUE(documento_paciente)
);

CREATE TABLE Especialidad (
    id_especialidad SERIAL PRIMARY KEY,
    nombre_especialidad VARCHAR(60),
    descripcion_especialidad VARCHAR(200)
);

CREATE TABLE Consultorio (
    id_consultorio SERIAL PRIMARY KEY,
    numero_consultorio INT,
    piso_consultorio INT
);

-- COMPLEX TABLES
CREATE TABLE Doctor(
    id_doctor SERIAL PRIMARY KEY,
    nombre_doctor VARCHAR(50),
    apellidos_doctor VARCHAR(60),
    correo_doctor VARCHAR(100),
    telefono_doctor VARCHAR(20),
    cedula_doctor VARCHAR(20),
    sexo_doctor sexo_enum,
    direccion_doctor VARCHAR(100),
    fecha_vinculacion_doctor DATE,

    id_especialidad_doctor INT,
    id_consultorio_doctor INT,

    -- FOREIGN KEYS
    CONSTRAINT fk_especialidad_doctor 
        FOREIGN KEY(id_especialidad_doctor) 
        REFERENCES Especialidad (id_especialidad),

    CONSTRAINT fk_consultorio_doctor 
        FOREIGN KEY(id_consultorio_doctor) 
        REFERENCES Consultorio(id_consultorio)
);

CREATE TABLE Cita(
    id_cita SERIAL PRIMARY KEY,
    motivo_cita VARCHAR(200),
    estado_cita estado_cita_enum,
    fecha_cita TIMESTAMP NOT NULL,

    id_paciente_cita INT,
    id_doctor_cita INT,

    -- FOREIGN KEYS
    CONSTRAINT fk_paciente_cita 
        FOREIGN KEY(id_paciente_cita) 
        REFERENCES Paciente(paciente_id),

    CONSTRAINT fk_doctor_cita 
        FOREIGN KEY(id_doctor_cita) 
        REFERENCES Doctor(id_doctor),

    -- LOGIC CONSTRAINTS
    CONSTRAINT check_fecha_cita 
        CHECK(fecha_cita >= CURRENT_TIMESTAMP),

    CONSTRAINT unique_doctor_fecha
        UNIQUE(id_doctor_cita, fecha_cita),

    CONSTRAINT unique_paciente_fecha
        UNIQUE(id_paciente_cita, fecha_cita)
);