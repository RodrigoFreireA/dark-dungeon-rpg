# Usar imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY . .

# Instalar as dependências do projeto
RUN npm install express socket.io cors

# Expor a porta usada pelo servidor
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "server.js"]
