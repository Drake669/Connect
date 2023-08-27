import InitialModal from "@/components/Modals/InitialModal";
import { db } from "@/lib/db";
import InitialProfile from "@/lib/IntialProfile";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await InitialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }
  return <InitialModal />;
}
