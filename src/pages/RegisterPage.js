import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onRegister({ name, email, password }) {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  }

  return (
    <section className="register-page">
      <h2>Register</h2>
      <RegisterInput register={onRegister} />
      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </section>
  );
}

export default RegisterPage;