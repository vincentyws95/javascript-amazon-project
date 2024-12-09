import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatToDate(dateTime) {
  return dayjs(dateTime).format("MMMM D");
}
