-- CreateTable
CREATE TABLE "Donation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "civility" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER,
    "hairTypes" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "allowResale" BOOLEAN NOT NULL DEFAULT false,
    "allowWigUse" BOOLEAN NOT NULL DEFAULT false,
    "wantsConfirmation" BOOLEAN NOT NULL,
    "message" TEXT,
    "donationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
