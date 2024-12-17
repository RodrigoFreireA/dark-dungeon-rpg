# Usa uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala as dependências no container
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expor a porta
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "start"]
