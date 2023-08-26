import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const profile = async() => {
    const { userId } =  auth();
    if(!userId){
       return null
    }

    const profile = db.profile.findUnique({
        where: {
            userId
        }
    })
    return profile
}