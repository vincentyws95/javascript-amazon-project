import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatToMonthDate(dateTime) {
  return dayjs(dateTime).format("MMMM D");
}

export function formatToDayMonthDate(dateTime) {
  return dayjs(dateTime).format("dddd, MMMM D");
}
