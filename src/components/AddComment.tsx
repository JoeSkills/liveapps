"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { db } from "../../firebase.config";
import { comment } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MessageCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const commentFormSchema = z.object({
  comment: z.string(),
});

const AddComment = ({ id, comments }: { id: string; comments: [comment] }) => {
  async function commentSubmit(values: z.infer<typeof commentFormSchema>) {
    await setDoc(
      doc(db, "ideas", id),
      {
        comments: [
          ...comments,
          {
            id,
            comment: values.comment,
            username: `${user?.given_name} ${user?.family_name}`,
            createdAt: new Date(),
          },
        ],
      },
      { merge: true }
    );
  }
  const { user } = useKindeBrowserClient();
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {},
  });
  return (
    <Popover>
      <PopoverTrigger>
        <MessageCircle />
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(commentSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete="off"
                      placeholder="Eg. This is app looks terrible..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default AddComment;
