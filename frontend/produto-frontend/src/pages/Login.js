import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5213/api/auth/login', values);
      setToken(response.data.token);
      message.success("Login realizado com sucesso!");
      console.log(response.data.Token);
    } catch (error) {
      message.error("Erro ao fazer login. Verifique suas credenciais.");
    }
    setLoading(false);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Insira o usuário' }]}>
        <Input placeholder="Usuário" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Insira a senha' }]}>
        <Input.Password placeholder="Senha" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
