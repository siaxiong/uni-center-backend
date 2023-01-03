/*
  Warnings:

  - A unique constraint covering the columns `[pdfId]` on the table `AssignmentSubmission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pdfName` to the `AssignmentSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AssignmentSubmission` ADD COLUMN `pdfName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AssignmentSubmission_pdfId_key` ON `AssignmentSubmission`(`pdfId`);
