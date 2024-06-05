"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import Tiptap from "./TipTapEditor";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const addNewIdeaToFirebase = async (newIdea: {
  title: string;
  image: string;
  description: string;
  uid: string | undefined;
  idea: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "ideas"), {
      assists: [],
      ...newIdea,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const formSchema = z.object({
  title: z.string(),
  image: z.string(),
  description: z.string(),
  idea: z.string(),
});

const IdeaForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const [myImgURL, setImgURL] = useState("");
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const [isUploadingIdea, setIsUploadingIdea] = useState(false);

  useEffect(() => {
    form.register("image");
    myImgURL && form.setValue("image", myImgURL);
  }, [myImgURL, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsUploadingIdea((prev) => !prev);
    addNewIdeaToFirebase({ ...values, uid: user?.id }).then(() =>
      setIsUploadingIdea((prev) => !prev)
    );
  };

  return (
    <Form {...form}>
      <h1 className="mb-3 font-bold text-3xl">Add a new project</h1>
      <Separator className="my-2" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImgURL(res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {myImgURL && <Image alt="" width={500} height={500} src={myImgURL} />}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="for example... A Cooking App" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the app..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Tiptap form={form} />

        <Button disabled={isUploadingIdea} type="submit">
          {isUploadingIdea ? (
            <>
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <> Please wait</>
            </>
          ) : (
            <>Add Project</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default IdeaForm;
