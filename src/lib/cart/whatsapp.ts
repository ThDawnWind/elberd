import type { CartItem } from "@/types";

export const buildWhatsAppMessage = ({
  items,
  totalAmount,
  deliveryInfo,
}: {
  items: CartItem[];
  totalAmount: number;
  deliveryInfo: { address: string; name: string; phone: string; whatsapp: string };
}) => {
  const itemsList = items
    .map((item) => {
      const qty = item.quantity ?? 1;
      return `• ${item.name} - ${qty} x ${item.price}₽ = ${item.price * qty}₽`;
    })
    .join("\n");

  return encodeURIComponent(
    `*Новый заказ*\n\n` +
      `*Товары:*\n${itemsList}\n\n` +
      `*Сумма заказа:* ${totalAmount}₽\n` +
      `*Адрес доставки:* ${deliveryInfo.address}\n` +
      `*Имя:* ${deliveryInfo.name}\n` +
      `*Телефон:* ${deliveryInfo.phone}\n` +
      `*WhatsApp:* ${deliveryInfo.whatsapp}`
  );
};