INSERT INTO Especialidad (nombre_especialidad, descripcion_especialidad) VALUES
('Medicina General', 'Atencion primaria y diagnostico general'),
('Pediatria', 'Atencion medica especializada en niños'),
('Dermatologia', 'Tratamiento de enfermedades de la piel'),
('Cardiologia', 'Diagnostico y tratamiento de enfermedades del corazon');

INSERT INTO Consultorio (numero_consultorio, piso_consultorio) VALUES
(101, 1),
(102, 1),
(201, 2),
(202, 2);


INSERT INTO Paciente (
    nombre_paciente,
    apellidos_paciente,
    correo_paciente,
    telefono_paciente,
    tipo_documento_paciente,
    documento_paciente,
    fecha_nacimiento_paciente,
    sexo_paciente,
    direccion_paciente,
    fecha_vinculacion_paciente
) VALUES
('Juan', 'Perez Gomez', 'juan.perez@gmail.com', '3001234567',
 'Cedula de ciudadania', '1001234567', '1998-05-14', 'Masculino',
 'Calle 10 #15-20', '2024-01-10'),

('Maria', 'Lopez Ramirez', 'maria.lopez@gmail.com', '3019876543',
 'Cedula de ciudadania', '1009876543', '1995-09-21', 'Femenino',
 'Carrera 8 #12-30', '2024-02-15'),

('Carlos', 'Sanchez Torres', 'carlos.sanchez@gmail.com', '3024567890',
 'Cedula de ciudadania', '1012345678', '1988-03-03', 'Masculino',
 'Calle 25 #30-40', '2024-03-20'),

('Laura', 'Martinez Diaz', 'laura.martinez@gmail.com', '3036547891',
 'Tarjeta de identidad', '1023456789', '2008-07-18', 'Femenino',
 'Carrera 20 #22-11', '2024-04-05');

INSERT INTO Doctor (
    nombre_doctor,
    apellidos_doctor,
    correo_doctor,
    telefono_doctor,
    cedula_doctor,
    sexo_doctor,
    direccion_doctor,
    fecha_vinculacion_doctor,
    id_especialidad_doctor,
    id_consultorio_doctor
) VALUES
('Andres', 'Gutierrez Mora', 'andres.gutierrez@clinic.com', '3101112233',
 '900123456', 'Masculino', 'Calle 50 #20-15', '2023-06-01', 1, 1),

('Patricia', 'Rojas Silva', 'patricia.rojas@clinic.com', '3102223344',
 '900234567', 'Femenino', 'Carrera 60 #18-10', '2023-07-10', 2, 2),

('Miguel', 'Castro Herrera', 'miguel.castro@clinic.com', '3103334455',
 '900345678', 'Masculino', 'Calle 40 #12-09', '2023-08-15', 3, 3),

('Natalia', 'Vargas Pineda', 'natalia.vargas@clinic.com', '3104445566',
 '900456789', 'Femenino', 'Carrera 30 #25-17', '2023-09-20', 4, 4);


INSERT INTO Cita (
    motivo_cita,
    estado_cita,
    fecha_cita,
    hora_cita,
    id_paciente_cita,
    id_doctor_cita
) VALUES
('Consulta general por dolor de cabeza',
 'Agendada',
 CURRENT_DATE + INTERVAL '1 day',
 '09:00',
 1,
 1),

('Control pediatrico anual',
 'Agendada',
 CURRENT_DATE + INTERVAL '2 days',
 '10:00',
 4,
 2),

('Revision dermatologica por alergia',
 'Agendada',
 CURRENT_DATE + INTERVAL '3 days',
 '11:00',
 2,
 3),

('Chequeo cardiologico preventivo',
 'Agendada',
 CURRENT_DATE + INTERVAL '4 days',
 '08:00',
 3,
 4);