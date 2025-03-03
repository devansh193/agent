import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Chat } from "@/modules/chat/ui/components/chat";
import { Overview } from "@/modules/review/ui/components/overview";

interface ReviewSectionProps {
  className?: string;
}

export const ReviewSection = ({ className }: ReviewSectionProps) => {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      <Tabs defaultValue="overview" className="h-full flex flex-col">
        <TabsList className="w-full grid grid-cols-3 h-14 rounded-sm p-2 ">
          <TabsTrigger value="overview" className="w-full h-full">
            <h1 className="text-xs md:text-sm font-medium font-sans">
              Overview
            </h1>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="w-full h-full">
            <h1 className="text-xs md:text-sm font-medium font-sans">
              Detailed feedback
            </h1>
          </TabsTrigger>
          <TabsTrigger value="chat" className="w-full h-full">
            <h1 className="text-xs md:text-sm  font-medium font-sans">Chat</h1>
            <Label className="bg-neutral-700 text-xs text-neutral-100 px-2 py-0.5 rounded-full border">
              New
            </Label>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="flex-1">
          <Overview />
        </TabsContent>
        <TabsContent value="feedback" className="flex-1">
          {/* <Feedback /> */}
        </TabsContent>
        <TabsContent value="chat" className="flex-1">
          <Chat />
        </TabsContent>
      </Tabs>
    </div>
  );
};
