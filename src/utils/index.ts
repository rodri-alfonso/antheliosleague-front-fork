export const sanatize = (string: string) =>
  string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const isMobile = () => {
  const ua = navigator.userAgent;
  const isAndroid = Boolean(ua.match(/Android/i));
  const isIos = Boolean(ua.match(/iPhone|iPad|iPod/i));
  const isOpera = Boolean(ua.match(/Opera Mini/i));
  const isWindows = Boolean(ua.match(/IEMobile/i));

  return Boolean(isAndroid || isIos || isOpera || isWindows);
};

export const getLetterKeyByIndex = (index: number): string =>
  String.fromCharCode(65 + index);
