"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import DMConversationItem from "./_components/DMConversationItem";
import { Loader2 } from "lucide-react";
import { CreateGroupDialog } from "./_components/create-group-dialog";
import GroupConversationItem from "./_components/group-conversation-item";

type Props = React.PropsWithChildren<{}>;

function ConversationsLayout({ children }: Props) {
  const conversations = useQuery(api.conversations.get);

  // console.log({conversations});

  return (
    <>
      <ItemList title="Convertions" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversations found
            </p>
          ) : (
            conversations.map((conversation) => {
              return conversation.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  name={conversation.conversation.name || ""}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              ) : (
                <DMConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMember?.username || "Anonymous"}
                  imageUrl={conversation.otherMember?.imageUrl!}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
}

export default ConversationsLayout;
