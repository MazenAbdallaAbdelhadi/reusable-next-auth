import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const { title } = await req.json();

    if (!user || !user.id) {
      return new NextResponse("unAuthorized", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Missing course title", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        userId: user.id,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
