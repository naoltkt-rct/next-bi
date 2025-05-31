//
export const convertHexToRgb = (color = '000') =>
  ((hex) => (hex && hex.length === 3 ? hex.replace(/./g, '$&$&') : hex))(color.replace(/^#/, ''))
    ?.match(/.{2}/g)
    ?.map((c) => Number.parseInt(c, 16))
    ?.join(', ') || '0, 0, 0'
