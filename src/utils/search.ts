// Чи підходить текст під пошуковий запит.
// Регістр не важливий ('dell' знайде 'Dell'), пробіли по краях запиту прибираємо.
// Порожній запит підходить під будь-який текст: 'abc'.includes('') дає true.
export const matchesSearch = (text: string, query: string) =>
  text.toLowerCase().includes(query.trim().toLowerCase())
