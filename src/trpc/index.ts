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

  createModule: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        code: z.string(),
        contentWriter: z.string(),
        copyEditor: z.string(),
        faculty: z.string(),
        lecturerHours: z.coerce.number(),
        tutorialHours: z.coerce.number(),
        practicalHours: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        code,
        contentWriter,
        copyEditor,
        faculty,
        lecturerHours,
        practicalHours,
        tutorialHours,
      } = input;

      const getFaculty = await prisma.faculty.findFirst({
        where: {
          name: faculty,
        },
      });

      if (!getFaculty) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Faculty with that name does not exist",
        });
      }

      const data = await prisma.module.create({
        data: {
          name,
          code,
          contentWriter,
          copyEditor,
          Faculty: {
            connect: {
              id: getFaculty.id,
            },
          },
          lecturerHours,
          practicalHours,
          tutorialHours,
        },
      });

      return data;
    }),

  createFaculty: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        campus: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, campus } = input;

      if (!name || !campus) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Name and campus are required",
        });
      }

      const data = await prisma.faculty.create({
        data: {
          name,
          campus,
        },
      });

      return data;
    }),

  getLectures: protectedProcedure.query(async ({ ctx }) => {
    const getLecturers = await prisma.lecturer.findMany();

    const lecturers = getLecturers.map((lecturer) => {
      return {
        id: lecturer.id,
        email: lecturer.email,
        firstName: lecturer.firstName,
        lastName: lecturer.lastName,
        title: lecturer.title,
        faculty: lecturer.faculty,
        campus: lecturer.campus,
        position: lecturer.position,
        ttName: lecturer.ttName,
      };
    });

    return lecturers;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
