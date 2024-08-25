import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id)
      return new NextResponse("unAuthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) return new NextResponse("unAuthorized", { status: 401 });

    const attachment = await db.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENTS_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
