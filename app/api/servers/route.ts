import { db } from "@/lib/db"
import { profile } from "@/lib/profileId"
import { generateRandomUUID } from "@/lib/randomUUIDGenerator"
import { ChannelType, MemberRoles } from "@prisma/client"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
    try {
        const { name, serverLogo}  = await req.json()

        const currentProfile = await profile()
        if(!currentProfile){
            return new NextResponse("Unauthorized User", {status: 401})
        }
       const server =  await db.server.create({
            data: {
                name,
                serverLogo,
                profileId: currentProfile.id,
                inviteUrl: generateRandomUUID(),
                channels: {
                    create: [
                        {
                            name: "general",
                            profileId: currentProfile.id,
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            memeberRole: MemberRoles.ADMIN,
                            profileId: currentProfile.id,
                        }
                    ]
                }
            }
        })
        return  NextResponse.json(server)
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500})
    }
}