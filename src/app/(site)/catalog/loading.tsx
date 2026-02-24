import { NewtonLoader } from "@/components/ui/loader/NewtonLoader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center mb-4">
          <NewtonLoader />
        </div>
    </div>
  );
}