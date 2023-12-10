CREATE TABLE motorista(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(15) NOT NULL,
    dataNascimento VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    cnh varchar(100) NOT NULL
);

CREATE TABLE veiculo(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    placa VARCHAR(100) NOT NULL,
    ano VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    cor VARCHAR(15) NOT NULL,
    categoria VARCHAR(10) NOT NULL,
    km VARCHAR(100) NOT NULL
);