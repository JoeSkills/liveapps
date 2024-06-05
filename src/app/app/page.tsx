import { getIdeasDataFromFirebase } from "./actions";
import IdeaCard from "@/components/IdeaCard";

export default async function Home() {
  const ideaData = await getIdeasDataFromFirebase();
  return (
    <main className="px-2 py-2 md:px-16">
      <div className="flex gap-4 md:gap-8 flex-col md:flex-row ">
        {ideaData.map(
          ({ title, id, image, description, assists, comments }) => {
            return (
              <div key={id} className="w-full md:w-96">
                <IdeaCard
                  description={description}
                  ideaImage={image}
                  title={title}
                  assists={assists}
                  id={id}
                  comments={comments}
                />
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}
