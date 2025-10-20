const { Prisma, PrismaClient, Role, UserStatus } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const prisma = new PrismaClient();

const main = async () => {
  console.log("Memulai proses seeding...");

  // --- 1. Hashing Credentials ---

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, salt);

  // Refresh Token harus di-hash sebelum disimpan ke DB (seperti password)
  const rawRefreshToken = process.env.SEED_REFRESH_TOKEN;
  const hashedRefreshToken = await bcrypt.hash(rawRefreshToken, salt);

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Token berlaku 7 hari

  // --- 2. Membuat Users ---

  // USER BIASA (Risa)
  const userRisa = await prisma.user.create({
    data: {
      name: "Risa Saraswati",
      email: "risa@user.com",
      password: passwordHash,
      isEmailVerified: true,
      image: "https://placehold.co/150x150/000000/FFFFFF/png?text=RS",
      role: Role.USER,
      status: UserStatus.ACTIVE,
      lastLogin: new Date(),
      phoneNumber: "+6281234567890",
      bio: "Pengembang web dan pecinta kopi.",
      timezone: "Asia/Jakarta",
    },
  });

  // USER ADMIN
  const userAdmin = await prisma.user.create({
    data: {
      name: "Admin Super",
      email: "admin@contoh.com",
      password: passwordHash,
      isEmailVerified: true,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      lastLogin: new Date(),
    },
  });

  console.log(
    `✅ Dua pengguna dibuat: ${userRisa.name} (${userRisa.id}) dan ${userAdmin.name} (${userAdmin.id})`
  );

  // --- 3. Membuat Refresh Token untuk Risa ---

  await prisma.refreshToken.create({
    data: {
      hashedToken: hashedRefreshToken,
      userId: userRisa.id, // Menghubungkan ke User Risa
      userAgent: "Web Client (Seeded)",
      expiresAt: expirationDate,
    },
  });

  console.log("✅ Refresh Token dibuat untuk Risa.");

  // --- 4. Membuat Todo Items ---

  await prisma.todoItem.createMany({
    data: [
      {
        ownerId: userRisa.id,
        title: "Perbaiki Bug Autentikasi di Frontend",
        description: "Token tidak tersimpan di cookie HTTP-Only.",
        isCompleted: false,
        progress: 10,
      },
      {
        ownerId: userRisa.id,
        title: "Buat Dokumentasi API Todo",
        description: "Tulis swagger/openapi untuk endpoint CRUD.",
        isCompleted: true,
        progress: 100,
      },
      {
        ownerId: userAdmin.id,
        title: "Setup Deployment Pipeline",
        description: "Integrasi dengan CI/CD untuk deployment otomatis.",
        isCompleted: false,
        progress: 50,
      },
    ],
  });

  console.log("✅ Todo Items dibuat untuk Risa dan Admin.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
