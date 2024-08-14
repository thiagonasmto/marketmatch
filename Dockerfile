# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do seu projeto para o diretório de trabalho
COPY . .

# Construa a aplicação React
RUN npm run build

# Instale um servidor simples para servir a aplicação
RUN npm install -g serve

# Exponha a porta em que o servidor vai rodar
EXPOSE 80

# Comando para rodar o servidor e servir a aplicação
CMD ["serve", "-s", "build"]
