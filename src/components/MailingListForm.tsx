"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

const MailingListForm = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const formSchema = z.object({
    email: z.string(),
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsButtonLoading((prev) => !prev);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Joined successfully.",
          description: "Thank you for joining the waitlist!",
        });
      } else {
        throw new Error(
          data?.error || "Something went wrong, please try again later"
        );
      }
    } catch (e) {
      toast({
        description: "Failed to add you to the waitlist!",
      });
    }

    setIsButtonLoading((prev) => !prev);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex md:gap-8 flex-wrap md:flex-nowrap gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {
            <>
              <Button type="submit" disabled={isButtonLoading}>
                {" "}
                {isButtonLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Join waitlist{" "}
              </Button>
            </>
          }
        </form>
      </Form>
    </>
  );
};

export default MailingListForm;
