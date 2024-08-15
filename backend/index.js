require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Configuração do CORS para permitir qualquer origem
app.use(cors());

// Conexão com o PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario', // nome da tabela no banco de dados
    timestamps: false // se não houver colunas createdAt e updatedAt
});

app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

app.get('/usuarios', async (req, res) => {
    try {
        const bananas = await Banana.findAll();
        res.json(bananas);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
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
