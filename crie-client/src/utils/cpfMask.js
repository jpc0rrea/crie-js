const cpfMask = (value) => {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que não seja num por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // 2 grupos de número, e bota '.' entre eles
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export default cpfMask;
