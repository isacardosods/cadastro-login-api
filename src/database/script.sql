CREATE DATABASE cadastro_login;
USE cadastro_login;

CREATE TABLE empresa (
    id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(60) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    dominio VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email_institucional VARCHAR(60) NOT NULL UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    dtNascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    verificado TINYINT DEFAULT 0,
    fk_empresa INT NOT NULL,
    CONSTRAINT cFkUsuarioEmpresa
        FOREIGN KEY (fk_empresa)
        REFERENCES empresa(id_empresa)
);

CREATE TABLE verificacao_email (
    id_verificacao INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL UNIQUE,
    dt_expiracao DATETIME NOT NULL,
    fk_usuario INT NOT NULL,    
    CONSTRAINT fk_verificacao_usuario
        FOREIGN KEY (fk_usuario)
        REFERENCES usuario(id_usuario)
);

INSERT INTO empresa (razao_social, cnpj, dominio)
VALUES
('Tech Solutions LTDA', '12345678000101', 'techsolutions.com.br'),
('Nexus Sistemas LTDA', '98765432000199', 'nexussistemas.com.br'),
('Alpha Digital LTDA', '45678912000155', 'alphadigital.com.br');