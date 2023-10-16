import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return {
      message: "hello world",
    };
  }),
  createLecture: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        title: z.string(),
        faculty: z.string(),
        campus: z.string(),
        position: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { email, firstName, lastName, title, faculty, campus, position } =
        input;

      // create TTnAME BY TAKING the title add white space  and the first letter of the first name and last name
      const ttName = `${title} ${lastName} ${firstName[0]}.`;
      console.log(ttName);
      console.log(userId);
      try {
        const data = await prisma.lecturer.create({
          data: {
            email,
            firstName,
            lastName,
            title,
            faculty,
            campus,
            position,
            ttName,
          },
        });

        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
