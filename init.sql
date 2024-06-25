CREATE DATABASE arvan_challenge;

\ c arvan_challenge;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    phoneNumber VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE wallets(
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    balance INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE chargeCodes(
    id SERIAL PRIMARY KEY,
    code VARCHAR(1000) UNIQUE NOT NULL,
    value INT NOT NULL,
    count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE discountCodes(
    id SERIAL PRIMARY KEY,
    code VARCHAR(1000) UNIQUE NOT NULL,
    value INT NOT NULL,
    count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    walletId INT NOT NULL,
    discountCodeId INT,
    chargeCodeId INT,
    value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (walletId) REFERENCES wallets(id),
    FOREIGN KEY (discountCodeId) REFERENCES discountCodes(id),
    FOREIGN KEY (chargeCodeId) REFERENCES chargeCodes(id)
);

insert into
    users (phoneNumber)
values
    ('123');

insert into
    wallets (userId, balance)
values
    (1, 3000);

insert into
    chargeCodes (code, value, count)
values
    ("asdf", 10, 1000);