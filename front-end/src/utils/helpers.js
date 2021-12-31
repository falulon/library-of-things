import { formatRelative } from "date-fns";
import { he } from "date-fns/locale";

export const formatDate = (date) => {
  return `${formatRelative(new Date(date), new Date(), { locale: he })} `;
};

export const formatPrice = (number) => {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
  }).format(number);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => {
    return item[type];
  });
  if (type === "colors") {
    unique = unique.flat();
  }

  unique = unique.filter((element) => element !== undefined);

  return ["all", ...new Set(unique)];
};
