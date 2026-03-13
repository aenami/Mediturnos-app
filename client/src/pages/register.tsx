import { useState, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"

type FormData = {
  nombre: string
  apellidos: string
  correo: string
  tipo_documento: string
  documento: string
  password: string
  confirmPassword: string
}

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellidos: "",
    correo: "",
    tipo_documento: "Cedula de ciudadania",
    documento: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit:SubmitEventHandler = async (e) => {

    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
        const int_documento = parseInt(form.documento)
        await registerUser({  
        nombre: form.nombre,
        apellidos: form.apellidos,
        correo: form.correo,
        tipo_documento: form.tipo_documento,
        documento: int_documento,
        password: form.password
      })

      navigate("/login")

    } catch (err: unknown) {
        if(err instanceof Error){
          setError(err.message)
        }   
    } finally {
      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear cuenta
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="apellidos"
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="tipo_documento"
            value={form.tipo_documento}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Cedula de ciudadania">Cédula</option>
            <option value="Tarjeta de identidad">Tarjeta Identidad</option>
          </select>

          <input
            name="documento"
            placeholder="Número de documento"
            value={form.documento}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

        </form>

      </div>

    </div>

  )

}

export default Register