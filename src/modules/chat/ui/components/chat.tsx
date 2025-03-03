import { Assistant } from "@/app/assistant";

export const Chat = () => {
  return (
    <div className="h-full flex flex-col border border-gray-300 rounded-md">
      <div className="flex-1">
        <Assistant />
      </div>
    </div>
  );
};
