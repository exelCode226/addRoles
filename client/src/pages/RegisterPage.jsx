import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import '../components/styles/register.css';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/empleados');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    // Formatea el nombre completo con la primera letra de cada palabra en mayúscula y el resto en minúscula
    const formattedValues = {
      ...values,
      nombre: values.nombre
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    };

    Swal.fire({
      width: '22em auto', // Controla el ancho, lo reduje para celulares.
      title: 'Verifica los datos',
      html: `
        <h1>Nombre: ${formattedValues.nombre}</h1>
        <h4>Documento: ${formattedValues.documento}</h4>
        <h4>Correo: ${formattedValues.email}</h4>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar',
    }).then((result) => {
      if (result.isConfirmed) {
        signup(formattedValues);
      }
    });
  });

  return (
    <div>
      {registerErrors.map((error, i) => (
        <div className='bg-red-500 p-1 text-center text-white content-center' key={i}>
          {error}
        </div>
      ))}
      <div className='divPrincipal'>
        <div className='imageBackground'></div>
        <div className='cardRegister'>
          <div className='circle'></div>
          <div className='circle'></div>
          <div className='card-inner'>
            <h1 className='textRegistro'>Registro J&M</h1>
            <div className='containerRegister'>
              <form onSubmit={onSubmit}>
                <div className='flex'>
                  <div className='inputs'>
                    <label>Nombre completo</label>
                    <input
                      type='text'
                      className='input'
                      placeholder='Nombre completo'
                      {...register('nombre', { required: true })}
                    />
                    {errors.nombre && <p className='text-red-500'>Se requiere el nombre</p>}
                  </div>
                  <div className='inputs'>
                    <label>Documento</label>
                    <input
                      type='text'
                      className='input'
                      placeholder='Documento'
                      {...register('documento', { required: true })}
                    />
                    {errors.documento && <p className='text-red-500'>Se requiere el documento</p>}
                  </div>
                </div>
                <div className='flex'>
                  <div className='inputs'>
                    <label>Correo</label>
                    <input
                      type='text'
                      className='input'
                      placeholder='Correo'
                      {...register('email', { required: true })}
                    />
                    {errors.email && <p className='text-red-500'>Se requiere el correo</p>}
                  </div>
                  <div className='inputs'>
                    <label>Contraseña</label>
                    <input
                      type='password'
                      className='input'
                      placeholder='Contraseña'
                      {...register('contrasena', { required: true })}
                    />
                    {errors.contrasena && <p className='text-red-500'>Se requiere la contraseña</p>}
                  </div>
                </div>
                <div className='inputs'>
                  <select className='input' {...register('roles', { required: true })}>
                    <option value='' disabled>
                      Selecciona un rol
                    </option>
                    <option value='Administrador'>Administrador</option>
                    <option value='Gerente'>Gerente</option>
                  </select>
                </div>
                <button id='btn' className='button' type='submit'>
                  Registrar
                </button>
                <p>
                  ¿Ya tienes una cuenta? <Link to='/login' className='textLoginAndRegister'>Ingresa</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
