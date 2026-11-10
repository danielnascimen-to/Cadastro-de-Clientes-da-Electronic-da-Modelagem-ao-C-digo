import { Endereco } from './Endereco.js';

/**
 * Classe base dos clientes. Reúne o que PessoaFisica e PessoaJuridica
 * têm em comum: nome e endereço.
 */
export class Pessoa {
  #nome;
  #endereco;

  constructor(nome, endereco) {
    this.nome = nome;         // passa pelo setter (validação)
    this.endereco = endereco; // passa pelo setter (validação)
  }

  get nome() { return this.#nome; }
  set nome(valor) {
    if (typeof valor !== 'string' || valor.trim().length < 3) {
      throw new Error('Nome inválido: deve ter ao menos 3 caracteres.');
    }
    this.#nome = valor.trim();
  }

  get endereco() { return this.#endereco; }
  set endereco(valor) {
    if (!(valor instanceof Endereco)) {
      throw new Error('Endereço inválido: informe um objeto do tipo Endereco.');
    }
    this.#endereco = valor;
  }

  /** Descrição do cliente. As classes derivadas sobrescrevem este método. */
  descrever() {
    return `Nome: ${this.#nome} | Endereço: ${this.#endereco}`;
  }

  /**
   * @protected
   * Remove pontos, traço, barra e espaços de um documento.
   * (JavaScript não tem "protected": a marcação # do diagrama é
   * seguida por convenção, apenas as classes derivadas devem usar.)
   */
  removerMascara(valor) {
    return String(valor ?? '').replace(/[.\-/\s]/g, '');
  }
}
