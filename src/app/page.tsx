import MailingListForm from "@/components/MailingListForm";

export default async function Home() {
  return (
    <main className="px-2 py-2 md:px-16">
      <div className="mt-12 flex items-center flex-col">
        <p className="font-bold text-4xl md:w-1/2 text-center ">
          Is your project good enough for your portfolio?
        </p>
      </div>
      <p className="text-center mt-12 mb-4">
        The full version of this product isn&apos;t ready yet. Subscribe for
        updates on our launch
      </p>
      <div className="flex justify-center ">
        <MailingListForm />
      </div>
    </main>
  );
}
