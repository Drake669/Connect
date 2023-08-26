import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";
 
const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth()
    if(!userId) throw new Error("Unauthorized user")
    return { userId }
} 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
 serverLogo: f({image: {maxFileSize: "4MB", maxFileCount: 1}}).middleware( () => {
    return handleAuth()
 }).onUploadComplete(() => {
    console.log("file uploaded successfully to upload thing")
 }),
 messageFiles: f(["image", "pdf", "video"]).middleware(() => handleAuth()).onUploadComplete(() => {
    console.log("file uploaded successfully to upload thing")
 })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;