import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.sf_guard_user.upsert({
    where: {
      username: 'admin',
    },
    update: {},
    create: {
      created_at: new Date(),
      is_active: 1,
      is_super_admin: 1,
      username: 'admin',
      salt: '9858b6bea414104484d3bbff6bd0d75f',
      password: '6fd426b0776ff023e661eb30ccf2982de63d2982bfef84793476c0981130f5cfe99cc3cd919a4c39194bfd5bbee2834562adae74b594be4038ab3473c491010f', 
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })