import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';
import axios from 'axios';

const Produto = ({token}) => {
    const [form] = Form.useForm();
    const [produtos, setProdutos] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [produtoEditar, setProdutoEditar] = useState(null);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:5213/api/produtos', { headers: { Authorization: `Bearer ${token}` } });
            setProdutos(response.data);
        } catch (error) {
            message.error('Erro ao carregar produtos.');
        }
        
    };

    const handleAdd = () => {
        setProdutoEditar(null);
        form.resetFields(); 
        setIsModalVisible(true);
    };

    const handleEdit = (produto) => {
        setProdutoEditar(produto);
        form.setFieldsValue(produto); 
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5213/api/produtos/${id}`);
        fetchProdutos();
    };

    const handleSave = async (values) => {
            try{
            if (produtoEditar) {
                await axios.put(`http://localhost:5213/api/produtos/${produtoEditar.id}`, values, { headers: { Authorization: `Bearer ${token}` }});
            } else {
                await axios.post('http://localhost:5213/api/produtos', values, { headers: { Authorization: `Bearer ${token}` }});
            }

            fetchProdutos();
            setIsModalVisible(false);
            form.resetFields(); 
        }catch (error) {
            message.error('Erro ao salvar produto.');
        }
    };

    const columns = [
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },
        { title: 'Preço de Custo', dataIndex: 'precoCusto', key: 'precoCusto' },
        { title: 'Preço de Venda', dataIndex: 'precoVenda', key: 'precoVenda' },
        { title: 'Quantidade', dataIndex: 'quantidade', key: 'quantidade' },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, produto) => (
                <>
                    <Button type="link" onClick={() => handleEdit(produto)}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja excluir?"
                        onConfirm={() => handleDelete(produto.id)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="link" danger>
                            Excluir
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
                Adicionar Produto
            </Button>
            <Table columns={columns} dataSource={produtos} rowKey="id" />

            <Modal
                title={produtoEditar ? "Editar Produto" : "Adicionar Produto"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()} 
            >
                <Form form={form} onFinish={handleSave} layout="vertical">
                    <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="precoCusto" label="Preço de Custo" rules={[{ required: true, message: 'Por favor, insira o preço de custo!' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="precoVenda" label="Preço de Venda" rules={[{ required: true, message: 'Por favor, insira o preço de venda!' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="quantidade" label="Quantidade" rules={[{ required: true, message: 'Por favor, insira a quantidade!' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Produto;
