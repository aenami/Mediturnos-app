USE MediCitas;

INSERT INTO Especialidad (nombre_especialidad, descripcion_especialidad) VALUES
('Medicina General', 'Atencion primaria y diagnostico general'),
('Cardiologia', 'Tratamiento de enfermedades del corazon'),
('Dermatologia', 'Enfermedades de la piel'),
('Pediatria', 'Atencion medica infantil');

INSERT INTO Consultorio (numero_consultorio, piso_consultorio) VALUES
(101, 1),
(102, 1),
(201, 2),
(202, 2);

INSERT INTO Paciente 
(nombre_paciente, apellidos_paciente, correo_paciente, telefono_paciente,
 tipo_documento_paciente, documento_paciente,
 fecha_nacimiento_paciente, sexo_paciente,
 direccion_paciente, fecha_vinculacion_paciente)
VALUES
('Juan', 'Perez Gomez', 'juan.perez@email.com', '3001234567',
 'Cedula de ciudadania', '1001234567',
 '1995-06-12', 'Masculino',
 'Calle 10 #15-20', '2024-01-10'),

('Maria', 'Lopez Ramirez', 'maria.lopez@email.com', '3019876543',
 'Cedula de ciudadania', '1007654321',
 '1998-03-22', 'Femenino',
 'Carrera 8 #20-15', '2024-02-05'),

('Andres', 'Martinez Rios', 'andres.m@email.com', '3024567890',
 'Cedula de ciudadania', '1012345678',
 '1988-11-02', 'Masculino',
 'Calle 30 #5-60', '2024-03-01'),

('Sofia', 'Gomez Torres', 'sofia.g@email.com', '3045678901',
 'Tarjeta de identidad', '1098765432',
 '2008-09-14', 'Femenino',
 'Carrera 12 #40-11', '2024-04-12');

 INSERT INTO Doctor 
(nombre_doctor, apellidos_doctor, correo_doctor, telefono_doctor,
 cedula_doctor, sexo_doctor, direccion_doctor,
 fecha_vinculacion_doctor,
 id_especialidad_doctor, id_consultorio_doctor)
VALUES
('Carlos', 'Ramirez Soto', 'carlos.ramirez@clinic.com', '3101112233',
 '80012345', 'Masculino',
 'Calle 5 #12-40',
 '2022-01-15',
 1, 1),

('Laura', 'Hernandez Diaz', 'laura.hernandez@clinic.com', '3112223344',
 '80067890', 'Femenino',
 'Carrera 18 #9-22',
 '2021-05-20',
 2, 2),

('Miguel', 'Castro Leon', 'miguel.castro@clinic.com', '3123334455',
 '80111222', 'Masculino',
 'Calle 25 #30-14',
 '2023-03-10',
 3, 3);

INSERT INTO Doctor 
(nombre_doctor, apellidos_doctor, correo_doctor, telefono_doctor,
 cedula_doctor, sexo_doctor, direccion_doctor,
 fecha_vinculacion_doctor,
 id_especialidad_doctor, id_consultorio_doctor)
VALUES
('Carlos', 'Ramirez Soto', 'carlos.ramirez@clinic.com', '3101112233',
 '80012345', 'Masculino',
 'Calle 5 #12-40',
 '2022-01-15',
 1, 1),

('Laura', 'Hernandez Diaz', 'laura.hernandez@clinic.com', '3112223344',
 '80067890', 'Femenino',
 'Carrera 18 #9-22',
 '2021-05-20',
 2, 2),

('Miguel', 'Castro Leon', 'miguel.castro@clinic.com', '3123334455',
 '80111222', 'Masculino',
 'Calle 25 #30-14',
 '2023-03-10',
 3, 3);



-- Test
INSERT INTO Cita
(motivo_cita, estado_cita, fecha_cita,
 id_paciente_cita, id_doctor_cita)
VALUES
('Intento doble reserva', 'Agendada', '2026-03-10 09:00:00',
 2, 1);
