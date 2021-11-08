import React, { useRef, useState } from 'react';
// import './LogReg.css';
const axios = require('axios');
export const LogReg = () => {
    const email = useRef('');
    const password = useRef('');
    const name = useRef('');
    const mobile = useRef('');
    const logemail = useRef('');
    const logpassword = useRef('');
    const [message, setMessage] = useState(null);
    const [msg, setMsg] = useState(null);


    const doRegister = () => {
        let eml = email.current.value;
        let pwd = password.current.value;
        let uname = name.current.value;
        let umobile = mobile.current.value;
        axios.post('https://ttmg-backend.herokuapp.com/api/auth/staffRegister',
            {
                "email": eml,
                "password": pwd,
                "name": uname,
                "mobile": umobile
            })
            .then((response) => {
                if (response.status === 200) {
                    setMessage('Record Added Successfully !!');
                }
                else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    setMessage('Some details are missing or are incorrect !');
                    const texta = document.getElementById('1');
                    const textb = document.getElementById('2');
                    const textc = document.getElementById('3');
                    const textd = document.getElementById('4');
                    texta.value = null;
                    textb.value = null;
                    textc.value = null;
                    textd.value = null;
                }
                else if (error.response.status === 402) {
                    setMessage('User is Already registered !');
                    const texta = document.getElementById('1');
                    const textb = document.getElementById('2');
                    const textc = document.getElementById('3');
                    const textd = document.getElementById('4');
                    texta.value = null;
                    textb.value = null;
                    textc.value = null;
                    textd.value = null;
                }
                else {
                    console.log(error);
                }
            });
    }


    const doLogin = () => {
        let eml = logemail.current.value;
        let pwd = logpassword.current.value;

        axios.post('https://ttmg-backend.herokuapp.com/api/auth/staffLogin',
            {
                "email": eml,
                "password": pwd,

            })
            .then((response) => {
                if (response.status === 200) {
                    setMsg('Login Successful !!');
                }
                else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    setMsg('Email/password is missing !');
                    const texte = document.getElementById('5');
                    const textf = document.getElementById('6');

                    texte.value = null;
                    textf.value = null;

                }
                else if (error.response.status === 401) {
                    setMsg('Email or password is incorrect !');
                    const texte = document.getElementById('5');
                    const textf = document.getElementById('6');

                    texte.value = null;
                    textf.value = null;

                }
                else {
                    console.log(error);
                }
            });
    }

    if (msg === 'Login Successful !!') {
        return (
            <>
            </>
        )
    }

    return (
        <>

            <div id="regdiv">
                <h2 id='title1'> Register</h2>
                <h3 id='msg'>{message} </h3>

                <div>
                    <input ref={email} className='form' id='1' type='text' placeholder='type Email' />
                </div>
                <div className='form-group regpwdinput'>
                    <input ref={password} className='form' id='2' type='password' placeholder='type Password' />
                </div>
                <div className='form-group regnameinput'>
                    <input ref={name} className='form' id='3' type='text' placeholder='type Name' />
                </div>
                <div>
                    <input ref={mobile} className='form' id='4' type='text' placeholder='type Mobile No.' />
                </div>
                <div>
                    <button onClick={doRegister} className='regbtn'>Register</button>
                </div>

            </div>
            <br/><br/>
            <div id="Logdiv">
                <h2 id='title2'> Login</h2>
                <h3 id='msg'>{msg} </h3>

                <div>
                    <input ref={logemail} className='form' id='5' type='text' placeholder='type Email' />
                </div>
                <div className='form-group logpwdinput'>
                    <input ref={logpassword} className='form' id='6' type='password' placeholder='type Password' />
                </div>
                <div>
                    <button onClick={doLogin} className='logbtn'>Login</button>
                </div>

            </div>
        </>
    )
}