import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../../firebase.config";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

const getFilteredIdeasByUser = async (id: string | undefined) => {
  const ideasQuerySnapshot = await getDocs(
    query(collection(db, "ideas"), where("uid", "==", id))
  );
  if (ideasQuerySnapshot.size < 0) return;

  return ideasQuerySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    } as unknown;
  });
};

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const ideas = (await getFilteredIdeasByUser(user?.id)) as {
    docId: string;
    title: string;
    image: string;
    description: string;
    uid: string | undefined;
    idea: string;
  }[];

  return (
    <div className="px-2 py-2 md:px-16">
      <div className="w-64 hidden md:block">
        <span className="text-lg">Your Project</span>
        <div className="mt-12">
          <div className="flex gap-4 md:gap-8 flex-col md:flex-row ">
            <Link href={"/dashboard"}>
              {ideas?.map(({ title, docId, description, image }) => (
                <Card key={docId}>
                  <CardHeader>
                    <div className="mb-2">
                      <Image
                        className="w-full h-48 object-cover"
                        src={image}
                        alt=""
                        width={2000}
                        height={2000}
                      />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>{description}</CardContent>
                </Card>
              ))}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
