"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  MapPin,
  Phone,
  MessageSquare,
  X,
  CheckCircle,
  Send,
  Trash,
  UserPen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/types";
import { useCartStore } from "@/stores/cart.store";
import { CartItemCard } from "@/components/CartItemCard";
import { NewtonLoader } from "@/components/ui/loader/NewtonLoader";
import { isCheckoutValid } from "@/lib/cart/validators";
import { buildWhatsAppMessage } from "@/lib/cart/whatsapp";

const RESTAURANT_PHONE = "+79637042858";

export default function CartClient() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems());
  const totalAmount = useCartStore((s) => s.totalAmount());
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  const router = useRouter();

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    name: "",
    phone: "",
    whatsapp: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSuccessModal || showClearConfirm ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSuccessModal, showClearConfirm]);

  const handleSubmitOrder = () => setShowSuccessModal(true);

  const handleCloseModalAndRedirect = () => {
    setShowSuccessModal(false);
    setDeliveryInfo({ address: "", name: "", phone: "", whatsapp: "" });
    router.push("/catalog");
  };

  const isFormValid = useMemo(() => isCheckoutValid(deliveryInfo, items.length), [deliveryInfo, items.length]);

  const whatsappMessage = useMemo(
    () => buildWhatsAppMessage({ items, totalAmount, deliveryInfo }),
    [items, totalAmount, deliveryInfo]
  );

  const onHandleClearCart = () => {
    clearCart();
    setDeliveryInfo({ address: "", name: "", phone: "", whatsapp: "" });
    setShowClearConfirm(false);
  };

  if (!hasHydrated) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen" aria-busy="true">
        <span className="sr-only" aria-live="polite">
          Загружаем корзину…
        </span>
        <NewtonLoader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="bg-white border-b w-full">
        <div
          className={cn(
            "mx-auto px-4 py-4",
            "s:px-4 xs:px-4 sm:px-6 lg:px-8",
            "s:max-w-full xs:max-w-full sm:max-w-3xl lg:max-w-7xl"
          )}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 xs:w-5 h-6 xs:h-5 text-berd-primary" aria-hidden="true" />
              <h1 className="font-mono font-bold xs:text-lg text-2xl tracking-tight">Корзина</h1>
            </div>

            {items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 hover:bg-red-50 border-red-200 text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 xs:w-3 h-4 xs:h-3" aria-hidden="true" />
                <span className="s:hidden block font-sans xs:text-xs">Очистить корзину</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto px-4 pb-12",
          "s:px-2 xs:px-2 sm:px-2 lg:px-8",
          "s:max-w-full xs:max-w-full sm:max-w-full lg:max-w-7xl"
        )}
      >
        <div className="flex sm:flex-row s:flex-col xs:flex-col justify-between gap-6 sm:gap-2 lg:gap-8">
          <div className="space-y-4 mb-10 xs:mb-2 sm:w-3/5 lg:w-1/2">
            {items.length > 0 && <h2 className="mt-2 font-mono xs:text-base text-lg">Ваши товары</h2>}

            {items.length > 0 && (
              <ul className="space-y-3 mt-2 xs:h-96 xs:overflow-auto">
                {items.map((item) => (
                  <li key={item.id}>
                    <CartItemCard
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                      className="animate-in fade-in"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="space-y-4 sm:mt-11 lg:mt-11 sm:w-1/2 lg:w-2/6">
              <Card className="top-24 sticky space-y-4 p-4 sm:p-6">
                <h2 className="font-mono font-semibold text-lg">Данные для доставки</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="delivery-address" className="flex items-center gap-2 font-medium text-sm">
                      <MapPin className="w-4 h-4 font-sans text-gray-500" aria-hidden="true" />
                      Адрес доставки
                    </label>
                    <Input
                      id="delivery-address"
                      placeholder="ул. Примерная, д. 1, кв. 1"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      className="w-full"
                      autoComplete="street-address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="delivery-name" className="flex items-center gap-2 font-sans font-medium text-sm">
                      <UserPen className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      Ваше имя
                    </label>
                    <Input
                      id="delivery-name"
                      placeholder="Иван"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                      className="w-full"
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="delivery-phone" className="flex items-center gap-2 font-sans font-medium text-sm">
                      <Phone className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      Номер телефона
                    </label>
                    <Input
                      id="delivery-phone"
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      className="w-full"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="delivery-whatsapp" className="flex items-center gap-2 font-sans font-medium text-sm">
                      <MessageSquare className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      WhatsApp (для связи)
                    </label>
                    <Input
                      id="delivery-whatsapp"
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={deliveryInfo.whatsapp}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, whatsapp: e.target.value })}
                      className="w-full"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between">
                      <span className="font-mono font-light s:text-sm xs:text-sm">Кол-во:</span>
                      <span className="font-mono font-bold s:text-sm xs:text-sm text-xl">{totalItems} шт.</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-mono font-light s:text-sm xs:text-sm">Итого:</span>
                      <span className="font-mono font-bold s:text-sm xs:text-sm text-xl">{totalAmount} ₽</span>
                    </div>
                  </div>
                    {!isFormValid && (
                      <p className="mb-4 font-sans font-light text-red-500 text-xs">
                        Пожалуйста, заполните все поля, чтобы оформить заказ.
                      </p>
                    )}
                  <Button onClick={handleSubmitOrder} disabled={!isFormValid} className="bg-berd-primary hover:bg-black w-full transition-colors animate-pop">
                    Оформить заказ
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {items.length === 0 && (
          <div className="flex justify-center items-center mt-44">
            <Card className="p-8 w-full max-w-md text-center">
              <ShoppingCart className="mx-auto mb-4 w-16 xs:w-7 h-16 xs:h-7 text-gray-300" aria-hidden="true" />
              <p className="text-gray-500 xs:text-base text-lg">Корзина пуста</p>
              <Button onClick={() => router.push("/catalog")} className="bg-berd-primary hover:bg-black mt-4">
                Перейти в каталог
              </Button>
            </Card>
          </div>
        )}
      </div>

      {showSuccessModal && (
        <SuccessModal
          onClose={handleCloseModalAndRedirect}
          cartItems={items}
          totalAmount={totalAmount}
          deliveryInfo={deliveryInfo}
          whatsappMessage={whatsappMessage}
        />
      )}

      {showClearConfirm && (
        <ClearCartModal onConfirm={onHandleClearCart} onCancel={() => setShowClearConfirm(false)} />
      )}
    </div>
  );
}

function SuccessModal({
  onClose,
  cartItems,
  totalAmount,
  deliveryInfo,
  whatsappMessage,
}: {
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  deliveryInfo: { address: string; phone: string; name: string; whatsapp: string };
  whatsappMessage: string;
}) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const whatsappLink = `https://wa.me/${RESTAURANT_PHONE.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4" onClick={handleOverlayClick}>
      <div
        className={cn(
          "bg-white shadow-xl rounded-2xl w-full max-w-[450px] max-h-[75vh] overflow-y-auto",
          "animate-in fade-in zoom-in duration-300"
        )}
      >
        <div className="relative p-4 sm:p-6">
          <button
            onClick={onClose}
            className="top-2 sm:top-4 right-2 sm:right-4 z-10 absolute text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="mb-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="font-bold text-xl sm:text-2xl">Спасибо за заказ!</h2>
          </div>

          <div className="mb-2">
            <h3 className="mb-2 font-medium">Ваш заказ:</h3>
            <div className="space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg max-h-32 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-2 text-gray-500 text-xs">
                      {item.weight}г x{item.quantity}
                    </span>
                  </div>
                  <span className="font-medium">{item.price * item.quantity} ₽</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <h3 className="mb-1 font-medium">Ваши данные:</h3>

            <div className="flex justify-between gap-6 bg-gray-50 p-3 sm:p-4 rounded-lg text-sm">
              <div className="space-y-1">
                <p className="flex items-start gap-2">
                  <MapPin className="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-500" aria-hidden="true" />
                  <span>{deliveryInfo.address}</span>
                </p>

                <p className="flex items-center gap-2">
                  <UserPen className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  <span>{deliveryInfo.name}</span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  <span>{deliveryInfo.phone}</span>
                </p>

                <p className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  <span>{deliveryInfo.whatsapp}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-5 pt-4 border-t">
            <span className="font-bold xs:text-sm text-lg">Итого к оплате:</span>
            <span className="font-bold text-black xs:text-sm text-2xl">{totalAmount} ₽</span>
          </div>

          <div className="flex sm:flex-row flex-col gap-3">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="bg-green-600 hover:bg-green-700 w-full">
                <Send className="mr-2 w-4 h-4" aria-hidden="true" />
                Отправить заказ в WhatsApp
              </Button>
            </a>
          </div>

          <p className="mt-1.5 text-gray-500 text-xs text-center">
            Нажмите кнопку, чтобы отправить заказ менеджеру
          </p>
        </div>
      </div>
    </div>
  );
}

function ClearCartModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4" onClick={handleOverlayClick}>
      <div
        className={cn(
          "bg-white shadow-xl rounded-2xl w-full max-w-96",
          "animate-in fade-in zoom-in duration-300"
        )}
      >
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash className="w-8 xs:w-4 sm:w-5 h-8 xs:h-4 sm:h-5 text-red-600" aria-hidden="true" />
            </div>
          </div>

          <h2 className="mb-2 font-bold xs:text-sm sm:text-sm text-xl">Очистить корзину?</h2>
          <p className="mb-6 text-gray-600 xs:text-sm sm:text-sm">
            Вы уверены, что хотите удалить все товары из корзины?
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1 xs:h-8 sm:h-9">
              Отмена
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 xs:h-8 sm:h-9">
              Очистить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}