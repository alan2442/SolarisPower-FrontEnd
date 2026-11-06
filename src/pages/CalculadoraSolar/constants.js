/**
 * Lista das principais concessionárias de energia elétrica suportadas pela calculadora solar.
 */
export const CONCESSIONARIAS = [
  { value: 'CPFL', label: 'CPFL Energia' },
  { value: 'Enel', label: 'Enel Distribuição' },
  { value: 'Light', label: 'Light' },
  { value: 'Neoenergia', label: 'Neoenergia' },
  { value: 'Cemig', label: 'Cemig' },
  { value: 'Elektro', label: 'Elektro' },
  { value: 'Energisa', label: 'Energisa' }
];

/**
 * Mapeamento de Unidades Federativas (UF) para suas respectivas concessionárias padrão.
 */
export const MAPA_UF_CONCESSIONARIA = {
  SP: 'CPFL',
  RJ: 'Light',
  MG: 'Cemig',
  BA: 'Neoenergia',
  CE: 'Enel'
};