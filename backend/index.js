require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3001;

// Configuração do CORS para permitir qualquer origem
app.use(cors());

// Conexão com o PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

// Definição do modelo 'Usuario'
const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario', // nome da tabela no banco de dados
    timestamps: false // desativa as colunas createdAt e updatedAt
});

// Definição do modelo 'Itens'
const Itens = sequelize.define('Itens', {
    id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    tableName: 'item', // nome da tabela no banco de dados
    timestamps: false // desativa as colunas createdAt e updatedAt
});

app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Rota para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota para buscar todos os itens
app.get('/itens', async (req, res) => {
    try {
        const itens = await Itens.findAll();
        res.json(itens);
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        res.status(500).json({ error: 'Erro ao buscar itens' });
    }
});

// Rota para cadastrar um novo usuário
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verificar se o email já está cadastrado
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Gerar o hash da senha
        const hashSenha = await bcrypt.hash(senha, 10);

        // Criar um novo usuário
        const novoUsuario = await Usuario.create({
            nome: nome.trim(),
            email: email.trim(),
            senha: hashSenha,
        });

        // Retornar uma resposta de sucesso
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// Rota de autenticação
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    console.log('Requisição de login recebida');
    console.log('Email recebido:', email);

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        
        console.log('Usuário encontrado:', usuario);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Removendo espaços em branco do início e fim da senha
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha.trim());

        console.log('Senha fornecida:', senha);
        console.log('Senha armazenada (hash):', usuario.senha.trim());
        console.log('Senha correta:', senhaCorreta);

        if (!senhaCorreta) {
            console.log('Senha inválida');
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Autenticação bem-sucedida
        console.log('Login bem-sucedido');
        res.json({ message: 'Login bem-sucedido', usuario: { id_usuario: usuario.id_usuario, nome: usuario.nome.trim(), email: usuario.email.trim() } });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
});

// Sincronize o modelo com o banco de dados
sequelize.authenticate().then(() => {
    console.log('Conectado ao banco de dados!');
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});
