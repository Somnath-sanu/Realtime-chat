"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Header } from "./_components/header-file";
import { Body } from "./_components/body-file";
import { ChatInput } from "./_components/chat-input";
import RemoveFriendDialog from "./_components/remove-friend-dialog";
import DeleteGroupDialog from "./_components/delete-group-dialog";
import LeaveGroupDialog from "./_components/leave-group-dialog";

type ConversationPageProps = {
  params: {
    conversationId: Id<"conversations">;
  };
};

function ConversationPage({
  params: { conversationId },
}: ConversationPageProps) {
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
  });

  // console.log(conversation);

  // console.log({conversationId});

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}

        // setOpen={()=> setRemoveFriendDialogOpen(false)}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}

        // setOpen={()=> setRemoveFriendDialogOpen(false)}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}

        // setOpen={()=> setRemoveFriendDialogOpen(false)}
      />
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember!.username) || "Anonymous"
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember!.imageUrl
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Remove friend",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
}

export default ConversationPage;

//! since this page is marked as use client , all components render here like <Body/> is also use client , expect for {children}
