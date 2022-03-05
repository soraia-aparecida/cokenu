## Cokenu

### Descrição
- API para um aplicativo de receitas
- Principais funcionalidades: cadastrar/visualizar informações de usuários e receitas. Excluir usuários e receitas, e redefinir senha de um usuários. 

### Como usar
- Cadastrar novo usuário: usar o endpoint createUser. Passanod via body as seguintes informações: name, email, password, e role. Para role temos duas opções: ADMIN ou NORMAL. 

- Login: usar o endpoint login. Passando via body as seguintes informações: email, password.

- Feed: usar o endpoint feed. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de feed, colocando o token, no campo de Headers - Authorization.
As receitas que serão mostradas, são as receitas de pessoas que esse usuário segue, elas aparecem em ordem crescente, ou seja, das mais antigas até as mais atuais.

- Pegar informações do próprio usuário: usar o endpoint getUserProfile. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de informações do usuário, colando o token, no campo de Headers - Authorization. Irá retornar as informações não sensíveis do usuário, como: id, nome, e-mail e função.

- Pegar informações de outro usuário: usar o enpoint getAnotherUserProfile. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de informações de outro usuário, colocando o token, no campo de Headers - Authorization, e passando o id do outro usuário no campo de Path Variables - id. Irá retornar as informações não sensíveis de outro usuário, como: id, nome e e-mail.

- Redefinir senha: usar o endpoint changePassword. Para que o usuário tenha acesso a uma nova senha, ele deve informar no campo Body o email que ele cadastrou no nosso site. Como resposta, ele irá receber um email, com sua nova senha.

- Deletar contas: usar o endpoint deleteAccount. Somente usuário ADMIN podem realizar essa operação.
Para que ele possa excluir uma conta, primeiro o administrador faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de excluir usuário, colocando o token, no campo de Headers - Authorization, e passando o id do usuário, a ser excluído, no campo Body.

- Pegar uma receita: usar o enpoint getRecipe. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de visualizar receitas, colocando o token, no campo de Headers - Authorization, e passando o id da receita no campo de Path Variables - id.

- Criar receitas: usar o endpoint createRecipe. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de cadastrar recitas, colocando o token, no campo de Headers - Authorization, e passando no campo Body, as seguintes informações: title, description.

- Editar receitas: usar o endpoint editRecipe. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de editar receitas, colocando o token, no campo de Headers - Authorization, o id da receita no campo, Path Variables - id, e no campo Body, as seguintes informações: title, description.
O usuário só pode editar as receitas que ele mesmo cadastrou.

- Deletar receitas: usar o endpoint deleteRecipe. O usuário ADMIN pode deletar qualquer receita, mas um usuário NORMAL só pode deletar as receitas que ele mesmo cadastrou.
Para que ele possa excluir uma recita, primeiro faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de excluir receitas, colocando o token, no campo de Headers - Authorization, e passando o id da receita, a ser excluído, no campo Path Variables - id.

- Seguir outro usuário: usar o enpoint follwerUser. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de seguir usuário, colocando o token, no campo de Headers - Authorization, e passando no campo Body, o userToFollowId, que é o id, do outro usuário que a e pessoa deseja seguir.

- Deixar de seguir um usuário: usar o enpoint unfollowerUser. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de deixar de seguir usuário, colocando o token, no campo de Headers - Authorization, e passando no campo Body, o userToUnfollowId, que é o id, do outro usuário que a e pessoa deseja deixar de seguir.

* Para mais informações, sobre como usar essa API, consultar a documentação no Postaman, pois nela, tem exemplos de como usar cada enpoint. 

### Tecnologias utilizadas:
- Typescript
- Node.js
- Dotenv
- Express
- Cors
- MySQL
- Knex
- UUID
- Nodemailer
- Jsonwebtoken
- Bcryptjs
- Heroku

### Documentação do Postaman
https://documenter.getpostman.com/view/18384258/UVkvJXtT

### Documentação do Heroku
https://projeto-cokenu-soraia.herokuapp.com/
