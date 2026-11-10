/**
 * Endereço de um cliente.
 * Todos os campos são privados (#) e acessados por getters e setters.
 */
export class Endereco {
  #logradouro;
  #numero;
  #cidade;
  #uf;

  constructor(logradouro, numero, cidade, uf) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }

  get logradouro() { return this.#logradouro; }
  set logradouro(valor) { this.#logradouro = valor; }

  get numero() { return this.#numero; }
  set numero(valor) { this.#numero = valor; }

  get cidade() { return this.#cidade; }
  set cidade(valor) { this.#cidade = valor; }

  get uf() { return this.#uf; }
  set uf(valor) { this.#uf = valor; }

  toString() {
    return `${this.#logradouro}, ${this.#numero} - ${this.#cidade}/${this.#uf}`;
  }
}
