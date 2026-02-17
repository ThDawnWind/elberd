"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, MapPin, Phone, MessageSquare, Trash2, Plus, Minus, X, CheckCircle, Send, Trash, UserPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { CartItem } from "@/types";
import { mockCartItems } from "@/lib/products";

const RESTAURANT_PHONE = "+79637042858";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    name: "",
    phone: "",
    whatsapp: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (showSuccessModal || showClearConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

  
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSuccessModal, showClearConfirm]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemsAmount = cartItems.length

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setShowClearConfirm(false);
  };

  const isFormValid = 
    deliveryInfo.name.trim().length >= 2 &&
    deliveryInfo.address.trim().length > 5 &&
    deliveryInfo.phone.trim().length >= 10 &&
    deliveryInfo.whatsapp.trim().length >= 10 &&
    cartItems.length > 0;

  const handleSubmitOrder = () => {
    console.log("Заказ оформлен!", {
      items: cartItems,
      total: totalAmount,
      delivery: deliveryInfo,
    });
    setShowSuccessModal(true);
  };

  const handleCloseModalAndRedirect = () => {
    setShowSuccessModal(false);
    setCartItems([]);
    setDeliveryInfo({
      address: "",
      name: "",
      phone: "",
      whatsapp: "",
    });
    router.push("/catalog"); 
  };

  const getWhatsAppMessage = () => {
    const itemsList = cartItems
      .map((item) => `• ${item.name} - ${item.quantity} x ${item.price}₽ = ${item.price * item.quantity}₽`)
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

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="bg-white border-b w-full">
        <div className={cn(
          "mx-auto px-4 py-4",
          "s:px-4 xs:px-4 sm:px-6 lg:px-8",
          "s:max-w-full xs:max-w-full sm:max-w-3xl lg:max-w-7xl"
        )}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 xs:w-5 h-6 xs:h-5 text-berd-primary" />
              <h1 className="font-bold xs:text-lg text-2xl tracking-tight">Корзина</h1>
            </div>

            {cartItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 hover:bg-red-50 border-red-200 text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 xs:w-3 h-4 xs:h-3" />
                <span className="s:hidden block xs:text-xs">Очистить корзину</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={cn(
        "mx-auto px-4 pb-12",
        "s:px-2 xs:px-2 sm:px-2 lg:px-8",
        "s:max-w-full  xs:max-w-full sm:max-w-full lg:max-w-7xl"
      )}>
        
        <div className="flex flex-row sm:flex-row xs:flex-col lg:flex-grow justify-between gap-6 sm:gap-2 lg:gap-8">
          <div className="space-y-4 mb-10 xs:mb-2 sm:w-3/5 lg:w-1/2">
            {cartItems.length > 0 && (
              <h2 className="font-mono xs:text-base text-lg">Ваши товары</h2>
            )}

            {cartItems.length === 0 ? (
               <div className="flex justify-center items-center min-h-[60vh]">
                  <Card className="p-8 w-full max-w-md text-center">
                    <ShoppingCart className="mx-auto mb-4 w-16 xs:w-7 h-16 xs:h-7 text-gray-300" />
                    <p className="text-gray-500 xs:text-base text-lg">Корзина пуста</p>
                    <Button 
                      onClick={() => router.push("/catalog")}
                      className="bg-berd-primary hover:bg-black mt-4"
                    >
                      Перейти в каталог
                    </Button>
                  </Card>
              </div>
            ) : (
              <div className="xs:h-96 xs:overflow-auto">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="space-y-4 sm:mt-11 lg:mt-11 sm:w-1/2 lg:w-2/6">
              <Card className="top-24 sticky space-y-4 p-4 sm:p-6">
                <h2 className="font-semibold text-lg">Данные для доставки</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Адрес доставки
                    </label>
                    <Input
                      placeholder="ул. Примерная, д. 1, кв. 1"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-sm">
                      <UserPen className="w-4 h-4 text-gray-500" />
                      Ваше имя
                    </label>
                    <Input
                      placeholder="Иван"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Номер телефона
                    </label>
                    <Input
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium text-sm">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      WhatsApp (для связи)
                    </label>
                    <Input
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={deliveryInfo.whatsapp}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, whatsapp: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium s:text-sm xs:text-sm">Кол-во:</span>
                      <span className="font-bold s:text-sm xs:text-sm text-xl">
                        {itemsAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium s:text-sm xs:text-sm">Итого:</span>
                      <span className="font-bold s:text-sm xs:text-sm text-xl">
                        {totalAmount} ₽
                      </span>
                    </div>
                    
                  </div>

                  <Button
                    onClick={handleSubmitOrder}
                    disabled={!isFormValid}
                    className="bg-berd-primary hover:bg-black w-full"
                  >
                    Оформить заказ
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal 
          onClose={handleCloseModalAndRedirect} 
          cartItems={cartItems}
          totalAmount={totalAmount}
          deliveryInfo={deliveryInfo}
          whatsappMessage={getWhatsAppMessage()}
        />
      )}

      {showClearConfirm && (
        <ClearCartModal 
          onConfirm={clearCart}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}

function CartItemCard({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: CartItem; 
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <Card key={item.id} className="mb-2 overflow-hidden">
      <div className={cn(
        "flex gap-3 p-3",
        "s:gap-2 s:p-2",
        "xs:gap-3 xs:p-3",
        "sm:gap-4 sm:p-4",
        "lg:gap-5 lg:p-5"
      )}>
        <div className={cn(
          "relative flex-shrink-0 bg-gray-100 rounded-md overflow-hidden",
          "s:w-16 s:h-16",
          "xs:w-20 xs:h-20",
          "sm:w-20 sm:h-20",
          "lg:w-28 lg:h-28"
        )}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 490px) 64px, (max-width: 767px) 80px, (max-width: 1023px) 96px, 112px"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className={cn(
              "font-medium line-clamp-2",
              "s:text-xs",
              "xs:text-sm",
              "sm:text-sm"
            )}>
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Удалить товар"
            >
              <Trash2 className={cn(
                "s:w-2.5 s:h-2.5",
                "xs:w-3 xs:h-3",
                "sm:w-3.5 sm:h-3.5"
              )} />
            </button>
          </div>

          <p className="mt-0.5 text-gray-500 text-xs">{item.weight}г</p>

          <div className="flex justify-between items-center mt-auto">
            <span className={cn(
              "font-bold text-berd-primary",
              "s:text-[12px]",
              "xs:text-[12px]",
              "sm:text-[13px]"
            )}>
              {item.price * item.quantity} ₽
            </span>

            <div className="inline-flex items-center gap-3 p-1 xs:p-0.5 rounded-full">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className={cn(
                  "flex justify-center items-center bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-200 rounded-full transition-colors",
                  "s:w-5 s:h-5",
                  "xs:w-6 xs:h-6",
                  "sm:w-6 sm:h-6"
                )}
                aria-label="Уменьшить количество"
              >
                <Minus className={cn(
                  "s:w-2 s:h-2",
                  "xs:w-2.5 xs:h-2.5",
                  "sm:w-3 sm:h-3"
                )} />
              </button>
              
              <span className={cn(
                "font-medium text-center",
                "s:w-6 s:text-xs",
                "xs:w-8 xs:text-sm",
                "sm:w-10 sm:text-base"
              )}>
                {item.quantity}
              </span>
              
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className={cn(
                  "flex justify-center items-center bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-200 rounded-full transition-colors",
                  "s:w-6 s:h-6",
                  "xs:w-7 xs:h-7",
                  "sm:w-6 sm:h-6"
                )}
                aria-label="Увеличить количество"
              >
                <Plus className={cn(
                  "s:w-2 s:h-2",
                  "xs:w-2.5 xs:h-2.5",
                  "sm:w-3 sm:h-3"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SuccessModal({ 
  onClose, 
  cartItems, 
  totalAmount, 
  deliveryInfo,
  whatsappMessage 
}: { 
  onClose: () => void; 
  cartItems: CartItem[];
  totalAmount: number;
  deliveryInfo: { address: string; phone: string; name: string; whatsapp: string };
  whatsappMessage: string;
}) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const whatsappLink = `https://wa.me/${RESTAURANT_PHONE.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div 
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className={cn(
        "bg-white shadow-xl rounded-2xl w-full max-w-[450px] max-h-[75vh] overflow-y-auto",
        "animate-in fade-in zoom-in duration-300"
      )}>
        <div className="relative p-4 sm:p-6">
          <button
            onClick={onClose}
            className="top-2 sm:top-4 right-2 sm:right-4 z-10 absolute text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-600" />
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
                  <span className="font-medium">
                    {item.price * item.quantity} ₽
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <h3 className="mb-1 font-medium">Ваши данные:</h3>
            <div className="flex flex-row justify-between space-y-1 bg-gray-50 p-3 sm:p-4 rounded-lg text-sm">
              <div>
                <p className="flex items-start gap-2">
                <MapPin className="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-500" />
                <span>{deliveryInfo.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <UserPen className="w-4 h-4 text-gray-500" />
                <span>{deliveryInfo.name}</span>
              </p>
              </div> 
              <div>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{deliveryInfo.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span>{deliveryInfo.whatsapp}</span>
                  </p>
              </div>
         
            </div>
          </div>

          <div className="flex justify-between items-center mb-5 pt-4 border-t">
            <span className="font-bold xs:text-sm text-lg">Итого к оплате:</span>
            <span className="font-bold text-black xs:text-sm text-2xl">
              {totalAmount} ₽
            </span>
          </div>

          <div className="flex sm:flex-row flex-col gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:">
                <Send className="mr-2 w-4 h-4" />
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

function ClearCartModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className={cn(
        "bg-white shadow-xl rounded-2xl w-full max-w-96",
        "animate-in fade-in zoom-in duration-300"
      )}>
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash className="w-8 xs:w-4 sm:w-5 h-8 xs:h-4 sm:h-5 text-red-600" />
            </div>
          </div>
          
          <h2 className="mb-2 font-bold xs:text-sm sm:text-sm text-xl">Очистить корзину?</h2>
          <p className="mb-6 text-gray-600 xs:text-sm sm:text-sm">
            Вы уверены, что хотите удалить все товары из корзины?
          </p>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 xs:w-8 sm:w-9 xs:h-8 sm:h-9"
            >
              Отмена
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 xs:w-8 sm:w-9 xs:h-8 sm:h-9"
            >
              Очистить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}