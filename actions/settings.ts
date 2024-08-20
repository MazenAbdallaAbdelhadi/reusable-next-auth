"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "UnAuthorized!" };
  }

  const dbUser = await db.user.findFirst({ where: { id: user.id } });

  if (!dbUser) {
    return { error: "UnAuthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // updating email
  if (values.email && values.email !== dbUser.email) {
    const existinUser = await getUserByEmail(values.email);
    if (existinUser && existinUser.id !== dbUser.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent" };
  }

  // updating password
  if (values.password && values.newPassword && dbUser.password) {
    const matchedPassword = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!matchedPassword) {
      return { error: "Icorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
  }

  // delete newPassword field as it is not in the database model
  delete values.newPassword;

  // update user
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated!" };
};
