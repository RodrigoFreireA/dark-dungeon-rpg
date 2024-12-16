# Use uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos de dependências para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .

# Exponha a porta do servidor
EXPOSE 3001

# Inicie o servidor
CMD ["node", "server.js"]
