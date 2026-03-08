-- Insert Especialidades
INSERT INTO Especialidad (nombre_especialidad, descripcion_especialidad) VALUES
('Medicina General', 'Atención primaria y prevención de enfermedades.'),
('Pediatría', 'Cuidado médico de bebés, niños y adolescentes.'),
('Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón.');

-- Insert Consultorios
INSERT INTO Consultorio (numero_consultorio, piso_consultorio) VALUES
(101, 1),
(102, 1),
(201, 2);


-- Insert Pacientes
INSERT INTO Paciente (
    nombre_paciente, apellidos_paciente, contraseña_paciente, correo_paciente, 
    telefono_paciente, tipo_documento_paciente, documento_paciente, 
    fecha_nacimiento_paciente, sexo_paciente, direccion_paciente, fecha_vinculacion_paciente
) VALUES
('Juan', 'Pérez', 'hash_seguro_1', 'juan.perez@email.com', '3001234567', 'Cedula de ciudadania', '1050200300', '1990-05-15', 'Masculino', 'Calle 10 #20-30', CURRENT_DATE),
('Maria', 'García', 'hash_seguro_2', 'maria.garcia@email.com', '3109876543', 'Cedula de ciudadania', '52888999', '1985-10-22', 'Femenino', 'Carrera 5 #15-10', CURRENT_DATE),
('Andrés', 'López', 'hash_seguro_3', 'andres.kid@email.com', NULL, 'Tarjeta de identidad', '1100222333', '2012-03-08', 'Masculino', 'Av. Siempre Viva 123', CURRENT_DATE);

-- Insert Doctores
INSERT INTO Doctor (
    nombre_doctor, apellidos_doctor, contraseña_doctor, correo_doctor, 
    telefono_doctor, cedula_doctor, sexo_doctor, direccion_doctor, 
    fecha_vinculacion_doctor, id_especialidad_doctor, id_consultorio_doctor
) VALUES
('Carlos', 'Sánchez', 'doc_hash_1', 'carlos.med@clinica.com', '3201112233', '71222333', 'Masculino', 'Edificio Medico Of 301', CURRENT_DATE, 1, 1),
('Laura', 'Mendoza', 'doc_hash_2', 'laura.peds@clinica.com', '3154445566', '10203040', 'Femenino', 'Calle 100 #15-20', CURRENT_DATE, 2, 2);

-- Insert de  Citas
INSERT INTO Cita (
    motivo_cita, estado_cita, fecha_cita, hora_cita, id_paciente_cita, id_doctor_cita
) VALUES
('Control de rutina anual', 'Agendada', CURRENT_DATE + INTERVAL '1 day', '08:00:00', 1, 1),
('Fiebre persistente en el menor', 'Agendada', CURRENT_DATE + INTERVAL '2 days', '14:30:00', 3, 2),
('Revisión de exámenes de sangre', 'Completada', CURRENT_DATE, '09:00:00', 2, 1);