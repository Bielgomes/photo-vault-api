# photo-vault

Stack: Node.js, Fastify, Drizzle, Cloudflare R2

## Requisitos Funcionais (RFs):
- [X] Deve ser possível um usuário se cadastrar;
- [ ] Deve ser possível um usuário se autenticar;
- [ ] Deve ser possível obter o perfil do usuário logado;
- [ ] Deve ser possível cadastrar uma collection;
- [ ] Deve ser possível listar todas as collections;
- [ ] Deve ser possível deletar uma collection;
- [ ] Deve ser possível realizar novos uploads em uma collection;
- [ ] Deve ser possível listar todas as fotos de uma collection;
- [ ] Deve ser possível confirmar o upload de uma foto;

## Regras de Negócio (RNs):
- [X] A senha do usuário deve estar criptografada;
- [ ] Só deve ser possível fazer o upload de fotos;
- [ ] Só deve ser possível cadastrar no máximo 12 collections;
- [ ] Usuários só podem acessar suas collections;
- [ ] Fotos pendentes devem ser removidas após 15 minutos;

## Requisitos Não Funcionais (RNFs):
- [X] Utilização do PostgreSQL para persistência de dados;
- [ ] Utilização do Cloudflare R2 para o upload de arquivos;
- [ ] O upload deve ser feito diretamente pelo front-end utilizando Presigned URLs;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [X] A api deve ser documentada utilizando o padrão openapi;

# Allowed Mime Types
- image/jpeg (.jpg | .jpeg)
- image/png  (.png)
- image/webp (.webp)
