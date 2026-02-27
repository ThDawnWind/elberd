export const digits = (s: string) => s.replace(/\D/g, "");

export const isCheckoutValid = (info: {
  address: string; name: string; phone: string; whatsapp: string;
}, itemsCount: number) => {
  return (
    info.name.trim().length >= 2 &&
    info.address.trim().length > 5 &&
    digits(info.phone).length >= 10 &&
    digits(info.whatsapp).length >= 10 &&
    itemsCount > 0
  );
};