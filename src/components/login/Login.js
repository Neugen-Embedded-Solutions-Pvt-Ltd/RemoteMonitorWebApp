import React, {
    useState
} from 'react';
import axios from 'axios';
import {
    useNavigate 
} from 'react-router-dom';

const Login = ({setLoginformData}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const handleChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value
        }))
    }
    const redirectRegister = () => {
        navigate('/register');
        }
    const login = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:3001/auth/login', formData)
            .then((res) => {
                console.log(res.data)
                // let token = res.data.token
                // localStorage.setItem('token', token);
                alert('login success')
                navigate('/');
            }).catch((res)=>{
                console.log(res.response.data);
                document.getElementById('errorMsg').classList.add('error-message-popup')
                document.getElementById('errorMsg').innerHTML ="Invalid login credentials!";
            })
        
       
    }
    return (
<div className='flex w-full h-full justify-center items-center login-container'>
    <div className='neugen-login-container w-full p-8  justify-center'>
        <h1 className='font-bold text-center login-title text-white'>Sign in to your device</h1> 
        <div className='text-white mb-2  text-center w-full' id='errorMsg'></div>
            <form className='flex flex-col w-full' id='loginForm' onSubmit={login} > 
                <div className='neugen-input-group'> 
                    <input className='neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500' name='username' type='text'value={formData.username} onChange={handleChange} placeholder='USERNAME' required/>
                </div>
                <div className='neugen-input-group mb-0'> 
                   
                    <input className='neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500' name='password' type='password'value={formData.password} onChange={handleChange} placeholder='PASSWORD' required/>
                </div>
                <div className='forgot-password-section flex col justify-start mb-2'>
                    <button type='button' className='text-sm font-semibold text-white forgot-password-btn' id='forgotPassword'>Forgot Password?</button>
                </div>
               <div className='flex justify-center w-full mb-3 login-btn-container'> 
                    <button className='neugen-submit-btn w-full text-white' type='submit'>Login</button>
               </div>
            </form>
   
        <div className='flex justify-center'>
            <div className='flex text-white'>No account?  <button type='button' className='text-sm underline ml-2 register-btn' id='createAccount' onClick={redirectRegister}>Register New User</button></div>           
        </div>
    </div> 
    </div>
    )
}

export default Login;