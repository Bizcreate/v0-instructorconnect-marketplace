// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const studioOwner = await prisma.user.upsert({
    where: { email: "owner@studio.test" },
    update: {},
    create: {
      email: "owner@studio.test",
      firstName: "Olivia",
      userType: "STUDIO",
      studio: {
        create: {
          name: "CoreLagree Studio",
          size: "MEDIUM",
          address: "South Yarra, VIC",
          state: "VIC",
        },
      },
    },
  })

  const instructorUser = await prisma.user.upsert({
    where: { email: "coach@instructor.test" },
    update: {},
    create: {
      email: "coach@instructor.test",
      firstName: "Jesse",
      userType: "INSTRUCTOR",
      instructor: {
        create: {
          bio: "Lagree L1 coach",
          experienceYears: "3",
          skills: ["Lagree", "Cueing", "M3K"], // Json[] under the hood
          state: "VIC",
        },
      },
    },
  })

  console.log("studioOwnerId:", studioOwner.id)
  console.log("instructorUserId:", instructorUser.id)
}

main().finally(() => prisma.$disconnect())
