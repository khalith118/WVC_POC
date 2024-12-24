import React, { useState } from 'react'
import './Login.scss';
import logo from '../../assets/logo.svg';
import { ILoginForm } from '../../models/Profile';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../common/FormInput';
import { FormButton } from '../../common/FormButton';
import { useUserProfile } from '../../provider/UserProvider';
import { login } from '../../api/auth';
import { Error } from '../../common/Error';


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginForm>();
    const navigate = useNavigate();
    const { setProfile } = useUserProfile();
    const [error, setError] = useState('');
    const formSubmit: SubmitHandler<ILoginForm> = ({ email, password }) => {
        login({ email, password }).then((res: any) => {
            setProfile(res?.user);
            localStorage.setItem('token',res.token);
            localStorage.setItem('user',res.user);
            navigate('/members');
        }).catch(() => {
            setError('Internal server error. Please try again later')
        })
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit(formSubmit)} className='login-form'>
                <div className="topbar-logo">
                    <div className="logo"> <img src={logo} alt='' /></div>
                </div>
                <h2 className="title">Welcome!</h2>
                <div className='subtitle'>World Vision Canada is a Christian relief, development, and advocacy organization working to create lasting change in the lives of children and families.</div>
                <div className="form-box">
                    <FormInput
                        label='Email Address'
                        name='email'
                        type='text'
                        placeholder='Email Address'
                        register={register}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter valid Email Address',
                            },
                        }}
                        errors={errors}
                    />
                    <FormInput
                        label='Password'
                        name='password'
                        type='password'
                        placeholder='Password'
                        register={register}
                        rules={{ required: 'Email is required' }}
                        errors={errors}
                    />
                    <p className='forgotLink'><a title="Forgot Password" href="/en/forgot-password.html">I forgot my password</a></p>
                    <Error error={error} />
                    <div className='action'>
                        <FormButton type="submit">Login</FormButton>
                    </div>

                    <div className="sublink">New to world vision Canada?</div>
                    <div className='footer'>
                        <FormButton type="button" className='form-button btn-secondary'>Join Us!</FormButton>
                    </div>
                    <div className="sublink">With your help we can end poverty -- for good 🧡</div>
                </div>
            </form>
        </div>
    )
};
export default Login;