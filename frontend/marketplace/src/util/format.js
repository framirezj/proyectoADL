// Utilidad para formatear montos usando la configuración regional de español chileno (punto para miles)
// Uso: formatPesos(1234567) => "1.234.567"
//        formatPesos(1234567.89, { decimals: 2 }) => "1.234.567,89"
export const formatPesos = (value, options = {}) => {
  const n = Number(value ?? 0);
  const decimals = Number.isInteger(options.decimals) ? options.decimals : 0;
  return n.toLocaleString("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export default formatPesos;
