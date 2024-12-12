-- Criação da tabela 'personagens'
CREATE TABLE IF NOT EXISTS personagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    classe TEXT NOT NULL
);

-- Criação da tabela 'salas'
CREATE TABLE IF NOT EXISTS salas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    mestre TEXT NOT NULL
);

-- Opcional: Inserção de dados iniciais em 'salas'
INSERT INTO salas (nome, descricao, mestre) VALUES
('Aventura na Floresta', 'Explore uma floresta cheia de perigos e mistérios.', 'Mestre1'),
('Calabouço da Perdição', 'Uma masmorra cheia de desafios e recompensas.', 'Mestre2');

-- Opcional: Inserção de dados iniciais em 'personagens'
INSERT INTO personagens (nome, classe) VALUES
('Tharion', 'Guerreiro'),
('Morgana', 'Mago'),
('Lupin', 'Ladino');
