import { Pessoa } from './Pessoa.js';

/** Converte Date, "AAAA-MM-DD" ou "DD/MM/AAAA" em Date; lança erro se inválida. */
function converterData(valor) {
  const invalida = () => new Error('Data de nascimento inválida: informe uma data existente.');

  if (valor instanceof Date) {
    if (Number.isNaN(valor.getTime())) throw invalida();
    return new Date(valor.getFullYear(), valor.getMonth(), valor.getDate());
  }
  if (typeof valor !== 'string') throw invalida();

  const texto = valor.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
  if (!iso && !br) throw invalida();

  const [ano, mes, dia] = iso
    ? [Number(iso[1]), Number(iso[2]), Number(iso[3])]
    : [Number(br[3]), Number(br[2]), Number(br[1])];

  const data = new Date(ano, mes - 1, dia);
  // rejeita datas inexistentes (ex.: 31/02/2000), que o Date "corrige" sozinho
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
    throw invalida();
  }
  return data;
}

function formatarData(data) {
  const dd = String(data.getDate()).padStart(2, '0');
  const mm = String(data.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${data.getFullYear()}`;
}

export class PessoaFisica extends Pessoa {
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento, endereco) {
    super(nome, endereco);
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  get cpf() { return this.#cpf; }
  set cpf(valor) {
    const digitos = this.removerMascara(valor);
    if (!/^\d{11}$/.test(digitos)) {
      throw new Error('CPF inválido: deve ter 11 dígitos.');
    }
    this.#cpf = digitos;
  }

  get dataNascimento() { return this.#dataNascimento; }
  set dataNascimento(valor) {
    const data = converterData(valor);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data > hoje) {
      throw new Error('Data de nascimento inválida: não pode estar no futuro.');
    }
    this.#dataNascimento = data;
  }

  descrever() {
    const c = this.#cpf;
    const cpf = `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9)}`;
    return `[Pessoa Física] ${super.descrever()} | CPF: ${cpf} | Nascimento: ${formatarData(this.#dataNascimento)}`;
  }
}
