export function DishCardGridSkeleton() {
  return (
    <div className="group flex flex-col p-[4px] border border-border/60 rounded-xl w-[265px] h-[430px] overflow-hidden animate-pulse">

      {/* Картинка */}
      <div className="relative rounded-t-[8px] overflow-hidden">
        <div className="bg-gray-200 w-full h-[220px]" />
      </div>

      {/* Заголовок */}
      <div className="space-y-2 mt-[4px] p-[4px] h-[55px]">
        <div className="bg-gray-200 rounded w-4/5 h-4" />
        <div className="bg-gray-200 rounded w-3/5 h-4" />
      </div>

      {/* Линия */}
      <div className="bg-gray-200 mb-[3px] rounded-sm w-full h-[2px]" />

      <div className="flex flex-col flex-1 p-[4px]">

        <div className="space-y-2 mb-[10px]">
          <div className="bg-gray-200 rounded w-2/3 h-3" />
          <div className="bg-gray-200 rounded w-1/2 h-3" />
        </div>

        <div className="space-y-2 mb-auto h-[48px]">
          <div className="bg-gray-200 rounded w-full h-3" />
          <div className="bg-gray-200 rounded w-4/5 h-3" />
        </div>

        <div className="flex justify-between items-center gap-2 mt-3 pt-2 border-t">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 rounded w-20 h-3" />
            <div className="bg-gray-200 rounded w-16 h-5" />
          </div>

          <div className="bg-gray-200 rounded-lg w-28 h-9" />
        </div>

      </div>
    </div>
  );
}

export function DishCardListSkeleton() {
  return (
    <div className="flex flex-row border border-border/40 rounded-xl overflow-hidden animate-pulse">

      <div className="relative flex-shrink-0 ml-3 sm:w-48 lg:w-72">
        <div className="relative w-full aspect-square">
          <div className="bg-gray-200 w-full h-[288px]" />
        </div>


        <div className="top-2 sm:top-3 left-2 sm:left-3 absolute flex flex-col gap-1 sm:gap-2">
          <div className="bg-gray-300 rounded w-16 sm:w-20 h-5 sm:h-6" />
        </div>

        <div className="top-2 sm:top-3 right-2 sm:right-3 absolute bg-gray-300 rounded-md w-7 sm:w-8 h-7 sm:h-8" />
      </div>

      <div className="flex flex-col flex-grow px-3">
        <div className="flex flex-row justify-between gap-3 h-full max-h-[55px]">
          <div className="flex-1 space-y-2 mt-1">
            <div className="bg-gray-200 rounded w-3/4 h-5" />
            <div className="bg-gray-200 rounded w-1/2 h-5" />
          </div>

          <div className="flex-shrink-0 bg-gray-200 mt-1 rounded w-20 h-6" />
        </div>

        <div className="flex flex-col h-[100px] xs:h-[90px] sm:h-[110px] lg:h-[120px]">
          <div className="h-[40px] xs:h-[35px] sm:h-[42px] lg:h-[48px]">
            <div className="bg-gray-200 mt-2 rounded w-2/3 h-4" />
            <div className="bg-gray-200 mt-2 rounded w-1/2 h-4" />
          </div>

          <div className="flex flex-col h-[50px] xs:h-[45px] sm:h-[55px] lg:h-[60px]">
            <div className="bg-gray-200 mt-2 mb-1 rounded w-20 h-4" />
            <div className="bg-gray-200 rounded w-full h-3" />
            <div className="bg-gray-200 mt-2 rounded w-4/5 h-3" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto p-2 border-t">
          <div className="bg-gray-200 rounded w-24 h-4" />
          <div className="bg-gray-200 rounded-lg w-28 h-8" />
        </div>
      </div>
    </div>
  );
}