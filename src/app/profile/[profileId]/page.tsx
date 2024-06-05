import { Users } from "@kinde/management-api-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = async ({ params }: { params: { profileId: string } }) => {
  const { users } = await Users.getUsers({ userId: params.profileId });

  if (!users) return;

  const user = users[0];

  return (
    <div className="px-2 py-2 md:px-16">
      <div className="mb-6">
        <span className="font-bold text-2xl">Account</span>
      </div>
      <div>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={user?.picture ? user?.picture : ""}
              alt="@shadcn"
            />
            <AvatarFallback>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <span className="text-xl">
              {user?.first_name} {user?.last_name}
            </span>
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="mt-4">
          <Button variant={"destructive"}>Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
