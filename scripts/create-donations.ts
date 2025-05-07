import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { hairTypesEnum } from "@/schemas/donation"; // ajuste ce chemin

const civilities = ["monsieur", "madame"];
const states = ["pending", "confirmed"];

async function seedDonations() {
  console.log("Seeding donations...");
  for (let i = 0; i < 60; i++) {
    const civility = faker.helpers.arrayElement(civilities);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const age = faker.number.int({ min: 18, max: 70 });
    const hairTypes = faker.helpers.arrayElement(hairTypesEnum.options);
    const allowResale = faker.datatype.boolean();
    const allowWigUse = faker.datatype.boolean();
    const wantsConfirmation = faker.datatype.boolean();
    const message = faker.lorem.sentence();
    const specialId = faker.string.alphanumeric(12).toUpperCase();
    const status = faker.helpers.arrayElement(states);

    await prisma.donation.create({
      data: {
        civility,
        firstName,
        lastName,
        email,
        age,
        hairTypes,
        allowResale,
        allowWigUse,
        wantsConfirmation,
        message,
        specialId,
        status,
      },
    });
  }
  console.log("Seeding complete!");
}

seedDonations()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
