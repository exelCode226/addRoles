import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signin, isAuthenticated, errors: signinErrors } = useAuth();
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        signin(data);

    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/empleados")
        }
    }, [isAuthenticated])




    return (

        <>

            <div>


                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-center text-white content-center' key={i}>
                            {error}
                        </div>
                    ))
                }


                <div className='divPrincipal'>



                    <div className='imageBackground'>




                    </div>


                    <div className="cardLogin">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="card-inner">

                            <div className='containerRegister'>


                                <form


                                    onSubmit={onSubmit}>

                                    <h1 className='textLogin'>Ingreso J&M</h1>


                                    <div className="inputs">
                                        <label>Correo</label><br />
                                        <input type="email" className='input' placeholder='Correo'{...register('email', { required: true })} />
                                    </div>

                                    {
                                        errors.email && (
                                            <p className='text-red-500'>Se requiere el correo</p>
                                        )
                                    }


                                    <div className="inputs">
                                        <label>Contraseña</label><br />
                                        <input type="password" className='input' placeholder='Contraseña'{...register('contrasena', { required: true })} />
                                    </div>

                                    {
                                        errors.contrasena && (
                                            <p className='text-red-500'>Se requiere la contraseña</p>
                                        )
                                    }







                                    <button id='btn' className='button' type='submit'>Ingresar</button>

                                    <p>
                                        ¿No tienes una cuenta? <Link to="/register" className='textLoginAndRegister'>Regístrate</Link>
                                    </p>

                                    <p>
                                        <Link to="/send-password-reset-email" className='textLoginAndRegister'>Olvidé mi contraseña</Link>
                                    </p>


                                </form>




                            </div>
                        </div>
                    </div>
                </div >
            </div>

            <Toaster position="top-right"
                reverseOrder={false} />

        </>
    )
}

export default LoginPage;