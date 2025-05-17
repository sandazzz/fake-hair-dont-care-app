/*
  Warnings:

  - A unique constraint covering the columns `[specialId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donation_specialId_key" ON "Donation"("specialId");
