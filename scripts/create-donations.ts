//npx tsx scripts/create-donations.ts
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { hairTypesEnum } from "@/lib/schemas";
import { generateSpecialId } from "@/lib/random";

const civilities = ["monsieur", "madame"];
const states = ["pending", "confirmed"];

/**
 * Nettoie toutes les donations existantes dans la base de données
 */
// async function cleanDonations() {
//   console.log("Nettoyage des donations existantes...");
//   await prisma.donation.deleteMany({});
//   console.log("Nettoyage terminé!");
// }

/**
 * Génère des données de test pour les donations
 * @param count Nombre de donations à générer
 */
async function seedDonations(count: number = 80000) {
  console.log(`Génération de ${count} donations...`);

  try {
    for (let i = 0; i < count; i++) {
      const civility = faker.helpers.arrayElement(civilities);
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const age = faker.number.int({ min: 18, max: 70 });
      const hairTypes = faker.helpers.arrayElement(hairTypesEnum.options);
      const allowResale = faker.datatype.boolean();
      const allowWigUse = faker.datatype.boolean();
      const message = faker.lorem.paragraph();
      const specialId = generateSpecialId();
      const status = faker.helpers.arrayElement(states);
      const createdAt = faker.date.past({ years: 1 });

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
          message,
          specialId,
          status,
          createdAt,
        },
      });

      if (i % 10 === 0) {
        console.log(`${i} donations créées...`);
      }
    }
    console.log("Génération terminée avec succès!");
  } catch (error) {
    console.error("Erreur lors de la génération des donations:", error);
    throw error;
  }
}

async function main() {
  try {
    //await cleanDonations();
    await seedDonations();
  } catch (error) {
    console.error("Erreur lors de l'exécution du script:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
