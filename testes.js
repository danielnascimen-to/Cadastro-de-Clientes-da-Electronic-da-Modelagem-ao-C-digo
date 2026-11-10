import assert from 'node:assert/strict';
import { Endereco } from './src/Endereco.js';
import { Pessoa } from './src/Pessoa.js';
import { PessoaFisica } from './src/PessoaFisica.js';
import { PessoaJuridica } from './src/PessoaJuridica.js';

const end = () => new Endereco('Rua A', '10', 'Niterói', 'RJ');
let aprovados = 0;
let falhas = 0;

function teste(nome, fn) {
  try {
    fn();
    aprovados++;
    console.log(`  ok  - ${nome}`);
  } catch (erro) {
    falhas++;
    console.log(`  FALHOU - ${nome}\n         ${erro.message}`);
  }
}

console.log('Testes automatizados\n');

teste('herança: PessoaFisica e PessoaJuridica são Pessoa', () => {
  assert.ok(new PessoaFisica('Maria Silva', '12345678909', '15/03/1990', end()) instanceof Pessoa);
  assert.ok(new PessoaJuridica('Loja X', '12345678000195', 'Loja X Ltda', end()) instanceof Pessoa);
});
teste('nome com menos de 3 caracteres lança erro', () => {
  assert.throws(() => new PessoaFisica('Jo', '12345678909', '15/03/1990', end()), /Nome inválido/);
});
teste('CPF aceita pontos e traço e guarda só 11 dígitos', () => {
  const p = new PessoaFisica('Maria Silva', '123.456.789-09', '15/03/1990', end());
  assert.equal(p.cpf, '12345678909');
});
teste('CPF com quantidade errada de dígitos lança erro', () => {
  assert.throws(() => new PessoaFisica('Maria Silva', '1234567890', '15/03/1990', end()), /CPF inválido/);
});
teste('CPF com letras lança erro', () => {
  assert.throws(() => new PessoaFisica('Maria Silva', '1234567890A', '15/03/1990', end()), /CPF inválido/);
});
teste('CNPJ aceita ponto, barra e traço e guarda só 14 dígitos', () => {
  const p = new PessoaJuridica('Loja X', '12.345.678/0001-95', 'Loja X Ltda', end());
  assert.equal(p.cnpj, '12345678000195');
});
teste('CNPJ com 13 dígitos lança erro', () => {
  assert.throws(() => new PessoaJuridica('Loja X', '1234567800019', 'Loja X Ltda', end()), /CNPJ inválido/);
});
teste('razão social vazia lança erro', () => {
  assert.throws(() => new PessoaJuridica('Loja X', '12345678000195', '', end()), /Razão social/);
});
teste('data de nascimento no futuro lança erro', () => {
  assert.throws(() => new PessoaFisica('Maria Silva', '12345678909', '01/01/2099', end()), /futuro/);
});
teste('data inexistente (31/02/2000) lança erro', () => {
  assert.throws(() => new PessoaFisica('Maria Silva', '12345678909', '31/02/2000', end()), /Data de nascimento inválida/);
});
teste('data de nascimento aceita DD/MM/AAAA e AAAA-MM-DD', () => {
  const a = new PessoaFisica('Maria Silva', '12345678909', '15/03/1990', end());
  const b = new PessoaFisica('Maria Silva', '12345678909', '1990-03-15', end());
  assert.equal(a.dataNascimento.getTime(), b.dataNascimento.getTime());
});
teste('setters também validam depois da criação', () => {
  const p = new PessoaFisica('Maria Silva', '12345678909', '15/03/1990', end());
  assert.throws(() => { p.nome = 'A'; }, /Nome inválido/);
  assert.throws(() => { p.cpf = '1'; }, /CPF inválido/);
  assert.equal(p.nome, 'Maria Silva'); // valor anterior preservado
});
teste('endereço precisa ser um objeto Endereco', () => {
  assert.throws(() => new PessoaFisica('Maria Silva', '12345678909', '15/03/1990', 'Rua A'), /Endereço inválido/);
});
teste('campos privados não são acessíveis de fora', () => {
  const p = new PessoaFisica('Maria Silva', '12345678909', '15/03/1990', end());
  assert.equal(p.cpf !== undefined, true);   // getter público
  assert.equal(Object.keys(p).length, 0);    // nenhum campo público
});
teste('polimorfismo: descrever() é específico de cada classe', () => {
  const pf = new PessoaFisica('Maria Silva', '12345678909', '15/03/1990', end());
  const pj = new PessoaJuridica('Loja X', '12345678000195', 'Loja X Ltda', end());
  assert.match(pf.descrever(), /Pessoa Física/);
  assert.match(pj.descrever(), /Pessoa Jurídica/);
});

console.log(`\n${aprovados} aprovados, ${falhas} falhas`);
process.exit(falhas === 0 ? 0 : 1);
