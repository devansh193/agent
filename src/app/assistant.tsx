"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid grid-cols-9 md:grid-cols-12 gap-4 h-full overflow-auto">
        <div className="hidden md:block col-span-3 border-r border-gray-200 dark:border-gray-800 p-4">
          <ThreadList />
        </div>
        <div className="col-span-9">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
