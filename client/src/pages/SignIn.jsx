import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();


  const handleChangeFormData = (event) => {
    console.log(event.target.id, event.target.value)
    setFormData({ ...formData, [event.target.id]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
    setLoading(true);
    const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    const data = await res.json()
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    
    setLoading(false);
    setError(null);
    Navigate('/');
  } catch (error) {
    setError(error.message);
      setLoading(false);
  }
  }
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          {/* <img className="w-8 h-8 mr-2" src="" alt="logo" /> */}
          Inmobiliaria
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Iniciar Sesion
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" onChange={handleChangeFormData} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={handleChangeFormData} />
              </div>
              <button disabled={loading} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear cuenta</button>
              <p className="text-sm font-light text-gray-500 ">
                ¿No tienes una cuenta? <Link to={"/sign-up"} className="font-medium text-primary-600 hover:underline ">Registrarse</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </section>
  )
}

export default SignIn