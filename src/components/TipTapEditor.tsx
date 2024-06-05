import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import { UseFormReturn } from "react-hook-form";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  editor.setOptions({
    extensions: [Image, Document, Dropcursor, Paragraph, Text],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl flex min-h-[192px] w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </Button>
      {/* <Button
        variant="secondary"
        onClick={() => {
          const url = window.prompt("URL");

          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        image
      </Button> */}
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </Button>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
More about your project...

`;

const TipTap = ({
  form,
}: {
  form: UseFormReturn<
    {
      title: string;
      image: string;
      description: string;
      idea: string;
    },
    any,
    undefined
  >;
}) => {
  const [ideaData, setIdeaData] = useState<string>("");

  useEffect(() => {
    form.register("idea");
    ideaData && form.setValue("idea", ideaData);
  }, [ideaData, form]);

  return (
    <EditorProvider
      onUpdate={({ editor }) => {
        console.log(editor.getHTML());
        setIdeaData(() => editor.getHTML());
      }}
      slotBefore={
        <div>
          {" "}
          <FormField
            control={form.control}
            name="idea"
            render={() => (
              <FormItem>
                <FormControl></FormControl>
              </FormItem>
            )}
          />
          <FormLabel>Project Details</FormLabel>
          <div className="mb-2" />
          <MenuBar />
        </div>
      }
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};

export default TipTap;
