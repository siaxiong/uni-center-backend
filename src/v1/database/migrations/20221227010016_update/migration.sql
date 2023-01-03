/*
  Warnings:

  - You are about to alter the column `pointsEarned` on the `AssignmentSubmission` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Assignment` MODIFY `pointsWorth` VARCHAR(191) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `AssignmentSubmission` MODIFY `pointsEarned` VARCHAR(191) NULL DEFAULT '0';
