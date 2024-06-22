CREATE TABLE users(
    phoneNumber VARCHAR(20) PRIMARY KEY,
    balance INT NOT NULL
);

CREATE TABLE codes(
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(1000) NOT NULL,
    type VARCHAR(1000) NOT NULL
);

CREATE TABLE usedCodes(
    id BIGSERIAL PRIMARY KEY,
    phoneNumber VARCHAR(20) NOT NULL,
    code VARCHAR(1000) NOT NULL,
    FOREIGN KEY (userPhoneNumber) REFERENCES users(phoneNumber),
    FOREIGN KEY (code) REFERENCES codes(code)
);

CREATE TABLE transactions(
    id BIGSERIAL PRIMARY KEY,
    phoneNumber VARCHAR(20),
);