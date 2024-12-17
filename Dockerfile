# Usa uma imagem Node.js oficial
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta 3001
EXPOSE 3001

# Comando para iniciar o servidor apontando para src/server.js
CMD ["node", "src/server.js"]
