import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { signUpStart, signUpSuccess, signUpFailure } from '../../redux/user/userSlice'; // Asegúrate de que estos actions existan

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage('Rellene todos los campos');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    try {
      dispatch(signUpStart());
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || 'Error en el registro');
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signUpSuccess(data));
      navigate('/'); // Redirigir a la página principal o al inicio de sesión
    } catch (error) {
      setErrorMessage(error.message);
      dispatch(signUpFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="signin-container bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center animate-pulse">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-field relative">
            <Label value='Nombre Completo' />
            <TextInput
              type="text"
              id="name"
              required
              placeholder="Nombre Completo"
              onChange={handleChange}
            />
          </div>
          <div className="input-field relative">
            <Label value='Correo Electrónico' />
            <TextInput
              type="email"
              id="email"
              required
              placeholder="Correo Electrónico"
              onChange={handleChange}
            />
          </div>
          <div className="input-field relative">
            <Label value='Contraseña' />
            <TextInput
              type="password"
              id="password"
              required
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Cargando...</span>
              </>
            ) : (
              <>
                Regístrate
                <i className="fas fa-arrow-right ml-2"></i>
              </>
            )}
          </Button>
        </form>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
        <p className="text-white text-center mt-6">
          ¿Ya tienes una cuenta?
          <a href="/sign-in" className="font-bold hover:underline">Inicia sesión</a>
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a href="#" className="text-white hover:text-purple-300 transition-colors duration-200">
            <i className="fab fa-facebook-f text-2xl fab"></i>
          </a>
          <a href="#" className="text-white hover:text-purple-300 transition-colors duration-200">
            <i className="fab fa-twitter text-2xl fab"></i>
          </a>
          <a href="#" className="text-white hover:text-purple-300 transition-colors duration-200">
            <i className="fab fa-google text-2xl fab"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
