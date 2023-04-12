import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function useFormattedDate(
  str,
  outputFormat = "yyyy-MM-dd HH:mm:ss"
) {
  if (str) {
    return format(parseISO(str), outputFormat);
  } else {
    return "no data";
  }
}
