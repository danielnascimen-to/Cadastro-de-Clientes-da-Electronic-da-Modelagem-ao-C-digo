import { Endereco } from './src/Endereco.js';
import { PessoaFisica } from './src/PessoaFisica.js';
import { PessoaJuridica } from './src/PessoaJuridica.js';

// Lista de clientes: guarda somente os cadastros que passaram nas validações.
const clientes = [];

/**
 * Tenta criar um cliente. Se algum valor for inválido, o erro lançado
 * pelo construtor/setter é capturado aqui e informado, sem derrubar o programa.
 */
function cadastrar(descricao, criarCliente) {
  try {
    const cliente = criarCliente();
    clientes.push(cliente);
    console.log(`  [OK]   ${descricao}`);
  } catch (erro) {
    console.log(`  [ERRO] ${descricao}`);
    console.log(`         Motivo: ${erro.message}`);
  }
}

const enderecoLoja = () => new Endereco('Av. Rio Branco', '156', 'Rio de Janeiro', 'RJ');
const enderecoCasa = () => new Endereco('Rua das Flores', '120', 'Niterói', 'RJ');

console.log('=== Cadastro de clientes - Electronic ===\n');

console.log('Cenário 1 - Pessoa física válida');
cadastrar('Maria Silva (CPF com máscara, data DD/MM/AAAA)', () =>
  new PessoaFisica('Maria Silva', '123.456.789-09', '15/03/1990', enderecoCasa()));

console.log('\nCenário 2 - Pessoa jurídica válida');
cadastrar('Electronic Store (CNPJ com máscara)', () =>
  new PessoaJuridica('Electronic Store', '12.345.678/0001-95',
    'Electronic Comércio de Eletrônicos Ltda', enderecoLoja()));

console.log('\nCenário 3 - Pessoa física inválida (CPF com 10 dígitos)');
cadastrar('Carlos Souza', () =>
  new PessoaFisica('Carlos Souza', '123.456.789-0', '20/07/1985', enderecoCasa()));

console.log('\nCenário 4 - Pessoa jurídica inválida (razão social vazia)');
cadastrar('Tech Atacado', () =>
  new PessoaJuridica('Tech Atacado', '98.765.432/0001-10', '   ', enderecoLoja()));

console.log('\nCenários extras de validação');
cadastrar('Pessoa física com nome de 2 caracteres', () =>
  new PessoaFisica('Jo', '12345678909', '01/01/2000', enderecoCasa()));
cadastrar('Pessoa física com data de nascimento no futuro', () =>
  new PessoaFisica('Ana Paula', '12345678909', '01/01/2099', enderecoCasa()));
cadastrar('Pessoa física com data inexistente (31/02/2000)', () =>
  new PessoaFisica('Pedro Lima', '12345678909', '31/02/2000', enderecoCasa()));
cadastrar('Pessoa jurídica com CNPJ de 13 dígitos', () =>
  new PessoaJuridica('Mega Eletro', '12.345.678/0001-9', 'Mega Eletro Ltda', enderecoLoja()));
cadastrar('Pessoa física válida (CPF sem máscara, data AAAA-MM-DD)', () =>
  new PessoaFisica('João Pereira', '98765432100', '1978-11-30', enderecoCasa()));

console.log('\n=== Cadastros válidos ===');
clientes.forEach((cliente, i) => console.log(`${i + 1}. ${cliente.descrever()}`));
console.log(`\nTotal de cadastros válidos: ${clientes.length}`);
