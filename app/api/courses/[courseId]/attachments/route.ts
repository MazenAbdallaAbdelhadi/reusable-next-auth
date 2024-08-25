import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    const { url } = await req.json();

    if (!user || !user.id)
      return new NextResponse("unAuthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) return new NextResponse("unAuthorized", { status: 401 });

    const attachment = await db.attachment.create({
        data:{
            url,
            name: url.split('/').pop(),
            courseId: params.courseId,
        }
    })


    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
