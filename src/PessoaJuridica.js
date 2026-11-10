import { Pessoa } from './Pessoa.js';

export class PessoaJuridica extends Pessoa {
  #cnpj;
  #razaoSocial;

  constructor(nome, cnpj, razaoSocial, endereco) {
    super(nome, endereco);
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
  }

  get cnpj() { return this.#cnpj; }
  set cnpj(valor) {
    const digitos = this.removerMascara(valor);
    if (!/^\d{14}$/.test(digitos)) {
      throw new Error('CNPJ inválido: deve ter 14 dígitos.');
    }
    this.#cnpj = digitos;
  }

  get razaoSocial() { return this.#razaoSocial; }
  set razaoSocial(valor) {
    if (typeof valor !== 'string' || valor.trim() === '') {
      throw new Error('Razão social inválida: campo obrigatório.');
    }
    this.#razaoSocial = valor.trim();
  }

  descrever() {
    const c = this.#cnpj;
    const cnpj = `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}`;
    return `[Pessoa Jurídica] ${super.descrever()} | CNPJ: ${cnpj} | Razão social: ${this.#razaoSocial}`;
  }
}
