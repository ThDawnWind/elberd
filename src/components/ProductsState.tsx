"use client";

import * as React from "react";

type ProductsErrorStateProps = {
  title?: string;
  code?: string;
  message: string;
  retryable?: boolean;
  onRetry?: () => void;
};

export function ProductsErrorState({
  title = "Что-то пошло не так",
  message,
  retryable = false,
  onRetry,
}: ProductsErrorStateProps) {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-8 border border-gray-200 rounded-2xl text-center">
      <div className="mb-4 text-4xl">😕</div>

      <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>

      <p className="mt-2 max-w-sm text-gray-600 text-sm">{message}</p>

      {retryable && onRetry && (
        <button
          onClick={onRetry}
          className="bg-black hover:opacity-80 mt-5 px-5 py-2.5 rounded-lg font-medium text-white text-sm transition"
        >
          Обновить
        </button>
      )}

      
    </div>
  );
}

export function ProductsEmptyState() {
  return (
    <div className="bg-gray-50 p-8 border border-gray-200 rounded-2xl text-center">
      <h3 className="font-semibold text-gray-900 text-lg">Ничего не найдено</h3>
      <p className="mt-2 text-gray-600 text-sm">
        Попробуйте изменить поиск, категорию или диапазон цен.
      </p>
    </div>
  );
}

export function ProductsLoadingState() {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-2xl text-center">
      <p className="text-gray-600 text-sm">Загрузка товаров...</p>
    </div>
  );
}