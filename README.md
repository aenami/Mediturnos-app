# MediTurnos 

**Sistema de gestión y reserva de citas médicas en línea**

MediTurnos es una aplicación web que permite a los usuarios **consultar, agendar y cancelar citas médicas de manera rápida y segura**.

El proyecto simula un flujo real de plataformas de salud modernas donde los pacientes pueden gestionar sus citas sin necesidad de llamadas telefónicas o procesos manuales.

Este proyecto fue desarrollado como práctica de **desarrollo full-stack**, implementando autenticación segura, comunicación cliente-servidor mediante API REST y una arquitectura escalable basada en componentes.

---

#  Demo del flujo principal

1. Registro o inicio de sesión del usuario
2. Selección de especialidad médica
3. Selección del doctor disponible
4. Elección de fecha y horario disponible
5. Confirmación de cita médica
6. Visualización de citas futuras
7. Cancelación de citas

---

# 🎯 Problema que resuelve

En muchos centros médicos, el proceso de asignación de citas sigue siendo:

* manual
* dependiente de llamadas telefónicas
* con poca visibilidad de disponibilidad real

Este sistema propone que:

* los **pacientes pueden gestionar sus citas de forma autónoma**
* los **horarios ocupados se bloquean automáticamente**
* se reduce la **carga administrativa del personal médico**
* se mejora la **experiencia del usuario**

Este tipo de sistema es común en:

* hospitales
* clínicas privadas
* plataformas de telemedicina
* sistemas internos de EPS o aseguradoras

---

# 🧠 Conceptos técnicos implementados

Este proyecto implementa varios conceptos clave del desarrollo moderno:

### Autenticación basada en JWT

Los usuarios se autentican mediante **JSON Web Tokens**, permitiendo:

* sesiones seguras
* protección de endpoints
* control de acceso a recursos del backend

---

### API RESTful

El backend expone endpoints como:

```
POST /auth/login
POST /auth/register

GET /appointments/user
POST /appointments
DELETE /appointments/:id

GET /specialities
GET /doctors/specialities/:id
```

Estos endpoints siguen una estructura REST clara y predecible.

---

### Manejo centralizado de peticiones HTTP

Se creó un módulo `apiFetch` que:

* añade automáticamente el **token JWT**
* centraliza las peticiones HTTP
* evita duplicación de lógica
* facilita el mantenimiento del proyecto

Esto simula el comportamiento de **interceptors** que se utilizan en aplicaciones profesionales.

---

### Arquitectura modular en React

El frontend está estructurado por responsabilidades:

```
src
│
├── components
│   ├── appointments
│   ├── Navbar
│   └── panels
│
├── pages
│   ├── Login
│   ├── Register
│   └── Workspace
│
├── services
│   └── api.ts
│
├── context
│   └── AuthContext
│
└── types
```

Esto permite:

* mejor mantenibilidad
* escalabilidad
* separación clara de responsabilidades

---

### Manejo de estado con React Hooks

Se utilizan hooks como:

* `useState`
* `useEffect`
* `useMemo`
* `Context API`

para gestionar:

* autenticación
* estado de citas
* estado de modales
* datos provenientes de la API

---

### Gestión de disponibilidad de horarios

El sistema calcula dinámicamente los horarios disponibles para cada doctor:

1. Genera horarios base
2. Consulta citas existentes
3. Filtra horarios ocupados
4. Muestra solo horas disponibles

Esto simula la lógica utilizada en **sistemas reales de agenda médica**.

---

#  Tecnologías utilizadas

## Frontend

* **React**
* **TypeScript**
* **Vite**
* **TailwindCSS**
* **ShadCN UI**
* Context API
* Fetch API

---

## Backend

* **Node.js**
* **Express**
* **TypeScript**
* **PostgreSQL**
* **JWT Authentication**
* **REST API**

---

## Base de datos

**PostgreSQL**
---

# 🔐 Seguridad implementada

El proyecto implementa varias prácticas de seguridad comunes:

* autenticación con **JWT**
* protección de rutas privadas
* validación de usuario autenticado
* envío automático de token en cada request
* manejo de errores en backend

---

# 🧱 Decisiones de arquitectura

Durante el desarrollo se tomaron varias decisiones para simular un entorno profesional:

### Separación frontend / backend

El frontend consume la API del backend de forma desacoplada.

Esto permite:

* escalar cada parte independientemente
* desplegar en servidores distintos

---

### Cliente HTTP centralizado

En lugar de usar `fetch` en todos los componentes, se creó:

```
services/api.ts
```

Esto evita duplicar lógica y facilita cambios futuros como:

* refresh tokens
* manejo global de errores
* interceptores

---

### Componentización

Componentes reutilizables como:

```
SpecialtySelect
DoctorSelect
HourSelect
```

permiten mantener la lógica separada de la interfaz.

---

# 📚 Aprendizajes del proyecto

Durante el desarrollo aplique y reforze conocimientos en:

* diseño de APIs REST
* autenticación JWT
* arquitectura de aplicaciones React
* manejo de estado
* integración frontend-backend
* modelado de base de datos
* manejo de errores en aplicaciones distribuidas

---

# 🚧 Posibles mejoras futuras

Algunas mejoras que podrían implementarse:

* refresh tokens para autenticación
* sistema de roles (admin / doctor / paciente)
* panel administrativo
* edición de citas
* recordatorios por correo electrónico
* integración con servicios de calendario
* despliegue en producción (Docker + cloud)

---

# 💼 Sobre el propósito de este proyecto

Este proyecto fue desarrollado como práctica para demostrar habilidades en:

* desarrollo **Full Stack**
* construcción de **APIs REST**
* integración **Frontend + Backend**
* diseño de **arquitectura escalable**
* uso de **TypeScript en proyectos reales**

La intención es simular un proyecto lo más cercano posible a un entorno profesional.
