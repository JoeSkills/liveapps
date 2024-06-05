import AddComment from "@/components/AddComment";
import { Separator } from "@/components/ui/separator";
import { doc, getDoc } from "firebase/firestore";
import { z } from "zod";
import { db } from "../../../../firebase.config";
import { Idea, comment } from "@/types";
import Image from "next/image";
import { Hammer } from "lucide-react";
import { Markup } from "interweave";
import { polyfill } from "interweave-ssr";

polyfill();

export const getIdeaDataFromFirebase = async (id: string) => {
  const ideaDoc = await getDoc(doc(db, "ideas", id));

  return { ...ideaDoc.data(), id: ideaDoc.id } as Idea;
};

const IdeaPage = async ({ params }: { params: { ideaId: string } }) => {
  const getCommentsFromFirebase = async () => {
    const commentsData = await getDoc(doc(db, "ideas", params.ideaId));

    if (!commentsData.exists()) {
      console.warn("Error");
      return "error";
    }

    return commentsData.data().comments as [comment];
  };
  const idea = await getIdeaDataFromFirebase(params.ideaId);

  const comments = await getCommentsFromFirebase();

  if (comments === "error") return <>Error In Firebase</>;

  return (
    <div className="px-2 py-2 md:px-16">
      <div className="bg-secondary px-6 py-10 pt-6 md:w-1/2 rounded-lg">
        <Image
          className="w-full h-48 object-cover rounded-md"
          src={idea.image}
          alt=""
          width={2000}
          height={2000}
        />
        <div>
          <div className="mb-2" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Joseph Oritseweyinmi</span>
            <div className="flex">
              <span>{idea.assists.length}</span>
              <Hammer />
            </div>
          </div>
        </div>
        <span className="font-bold text-2xl mt-6 block">{idea.title}</span>
        <p className="mt-8 text-sm ">{idea.description}</p>

        <Separator className="my-8 bg-primary" />
        <div>
          <Markup content={idea.idea} />
        </div>
      </div>
      <div className="pt-14 md:w-1/2">
        <div className="flex justify-between">
          <span className="font-bold text-lg">Feedbacks</span>
          <AddComment id={params.ideaId} comments={comments} />
        </div>
        <div className="mt-6" id="feedback">
          {comments.map(({ comment, username, id }) => (
            <div key={id} className="bg-secondary rounded-md px-4 py-4 mt-2">
              <div className="flex gap-2">
                <span className="text-sm font-semibold">{username}</span>
              </div>
              <p className="text-sm mt-2 font-normal ">{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaPage;
