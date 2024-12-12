const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./rpg.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Banco de dados criado com sucesso.');

        db.run(`
            CREATE TABLE IF NOT EXISTS personagens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                classe TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela personagens:', err.message);
            } else {
                console.log('Tabela personagens criada.');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS salas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT,
                mestre TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela salas:', err.message);
            } else {
                console.log('Tabela salas criada.');
            }
        });

        db.close();
    }
});
