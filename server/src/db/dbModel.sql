
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
    -- PACIENTE_ID NO
    paciente_id SERIAL PRIMARY KEY,
    nombre_paciente VARCHAR(50) NOT NULL,
    apellidos_paciente VARCHAR(60) NOT NULL,
    contraseña_paciente VARCHAR(250) NOT NULL,
    correo_paciente VARCHAR(50) NOT NULL,
    telefono_paciente VARCHAR(20) NULL,
    tipo_documento_paciente tipo_documento_enum NOT NULL,
    documento_paciente VARCHAR(20) NOT NULL,
    fecha_nacimiento_paciente DATE NULL,
    sexo_paciente sexo_enum NULL,
    direccion_paciente VARCHAR(40) NULL,
    fecha_vinculacion_paciente DATE NOT NULL,

    -- LOGIC CONSTRAINTS
    CONSTRAINT unique_documento_paciente UNIQUE(documento_paciente),
    CONSTRAINT unique_correo_paciente UNIQUE(correo_paciente)
);

CREATE TABLE Especialidad (
    id_especialidad SERIAL PRIMARY KEY,
    nombre_especialidad VARCHAR(60) NOT NULL,
    descripcion_especialidad VARCHAR(200) NULL
);

CREATE TABLE Consultorio (
    id_consultorio SERIAL PRIMARY KEY,
    numero_consultorio INT NOT NULL,
    piso_consultorio INT NOT NULL
);

-- COMPLEX TABLES
CREATE TABLE Doctor(
    id_doctor SERIAL PRIMARY KEY,
    nombre_doctor VARCHAR(50) NOT NULL,
    apellidos_doctor VARCHAR(60) NOT NULL,
    contraseña_doctor VARCHAR(250) NOT NULL,
    correo_doctor VARCHAR(100) NOT NULL,
    telefono_doctor VARCHAR(20) NULL,
    cedula_doctor VARCHAR(20) NOT NULL,
    sexo_doctor sexo_enum NULL,
    direccion_doctor VARCHAR(100) NULL,
    fecha_vinculacion_doctor DATE NOT NULL,

    id_especialidad_doctor INT NOT NULL,
    id_consultorio_doctor INT NOT NULL,

    -- FOREIGN KEYS
    CONSTRAINT fk_especialidad_doctor 
        FOREIGN KEY(id_especialidad_doctor) 
        REFERENCES Especialidad (id_especialidad),

    CONSTRAINT fk_consultorio_doctor 
        FOREIGN KEY(id_consultorio_doctor) 
        REFERENCES Consultorio(id_consultorio),
    
    -- LOGIC CONSTRAINTS
    CONSTRAINT unique_documento_doctor UNIQUE(cedula_doctor),
    CONSTRAINT unique_correo_doctor UNIQUE(correo_doctor)
);

CREATE TABLE Cita(
    id_cita SERIAL PRIMARY KEY,
    motivo_cita VARCHAR(200) NOT NULL,
    estado_cita estado_cita_enum NOT NULL,
    fecha_cita DATE NOT NULL NOT NULL,
    hora_cita TIME NOT NULL,

    id_paciente_cita INT NOT NULL,
    id_doctor_cita INT NOT NULL,

    -- FOREIGN KEYS
    CONSTRAINT fk_paciente_cita 
        FOREIGN KEY(id_paciente_cita) 
        REFERENCES Paciente(paciente_id),

    CONSTRAINT fk_doctor_cita 
        FOREIGN KEY(id_doctor_cita) 
        REFERENCES Doctor(id_doctor),

    -- LOGIC CONSTRAINTS
    CONSTRAINT check_fecha_cita 
        CHECK(fecha_cita >= CURRENT_DATE),

    CONSTRAINT unique_doctor_fecha
        UNIQUE(id_doctor_cita, fecha_cita, hora_cita),

    CONSTRAINT unique_paciente_fecha
        UNIQUE(id_paciente_cita, fecha_cita, hora_cita)
);