"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hammer, MessageCircle } from "lucide-react";
import Image from "next/image";
import { updateIdeaDataFromFirebase } from "@/app/app/actions";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import Link from "next/link";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { comment } from "@/types";
import AddComment from "./AddComment";

const IdeaCard = ({
  title,
  ideaImage,
  description,
  id,
  assists,
  comments,
}: {
  title: string;
  ideaImage: string;
  description: string;
  assists: string[];
  id: string;
  comments: [comment];
}) => {
  const [userCommments, setUserComments] = useState<[comment]>();
  const { user } = useKindeBrowserClient();

  const [isAssist, setIsAssist] = useState(
    assists?.includes(user?.id ? user?.id : "")
  );

  useEffect(() => {
    const getCommentsFromFirebase = async () => {
      const commentsData = await getDoc(doc(db, "ideas", id));

      if (!commentsData.exists()) {
        console.warn("Error");
        return;
      }

      console.log(commentsData.data().comments);
      return commentsData.data().comments as [comment];
    };
    getCommentsFromFirebase().then((comments) => setUserComments(comments));
  }, [id]);

  console.log(userCommments);
  return (
    <Card>
      <CardHeader>
        <div className="mb-2">
          <Image
            className="w-full h-48 object-cover"
            src={ideaImage}
            alt=""
            width={2000}
            height={2000}
          />
        </div>
        <div>
          <span className="text-sm font-semibold">Joseph Oritseweyinmi</span>
          <div className="mb-4" />
        </div>
        <CardTitle>
          {" "}
          <Link href={`/ideas/${id}#feedback`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <div className=" w-full">
          <div className="flex justify-between w-full items-center">
            <div>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsAssist((prev) => !prev);
                  if (isAssist) {
                    const index = assists.indexOf(user?.id ? user?.id : "");
                    if (index > -1) {
                      assists.splice(index, 1);
                    }
                  } else assists.push(user?.id ? user?.id : "");

                  updateIdeaDataFromFirebase({ id, newData: { assists } });
                }}
              >
                <Hammer />
                {!isAssist && <>&nbsp; Assist </>}
              </Button>
              &nbsp;
              <span>{assists?.length}</span>
            </div>
            <AddComment comments={comments} id={id} />
          </div>
          {userCommments && (
            <div className="bg-secondary rounded-md px-4 py-4 mt-8">
              <div className="flex gap-2">
                <span className="text-sm font-semibold">
                  {userCommments[0].username}
                </span>
              </div>
              <p className="text-sm mt-2 font-normal ">
                {userCommments[0].comment}
              </p>
              <div className="mt-4 ">
                <Link
                  href={`/ideas/${id}#feedback`}
                  className="text-sm font-light"
                >
                  View All Feedbacks
                </Link>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;
