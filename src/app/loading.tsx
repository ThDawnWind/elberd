import { NewtonLoader } from "@/components/ui/loader/NewtonLoader";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center bg-white px-4 min-h-screen">
      <div className="flex flex-col items-center bg-white shadow-sm px-8 py-10 border border-neutral-200 rounded-2xl">
        <div className="mb-5">
          <NewtonLoader />
        </div>

        <h1 className="font-semibold text-neutral-900 text-lg">
          Загрузка...
        </h1>

        <p className="mt-2 text-neutral-500 text-sm text-center">
          Подготавливаем страницу
        </p>
      </div>
    </div>
  );
}