export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("pt-BR").format(num);
};
