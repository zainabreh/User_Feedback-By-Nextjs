import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Message } from "@/model/User.model";
import { toast } from "sonner";
import axios from "axios";
import { ApiResponse } from "@/Types/ApiResponse";


type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({message,onMessageDelete} : MessageCardProps) => {

    const handleDeleteConfirm = async () => {

        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);

          toast.success("Message deleted successfully", {
                description: response.data.message,
              });
              
        onMessageDelete(message._id);
    }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive"><X className="h-5 w-5" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {handleDeleteConfirm}}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
};

export default MessageCard;
