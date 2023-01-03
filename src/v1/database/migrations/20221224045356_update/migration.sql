/*
  Warnings:

  - You are about to drop the column `studentId` on the `AssignmentSubmission` table. All the data in the column will be lost.
  - Added the required column `studentCourseId` to the `AssignmentSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AssignmentSubmission` DROP FOREIGN KEY `AssignmentSubmission_studentId_fkey`;

-- AlterTable
ALTER TABLE `AssignmentSubmission` DROP COLUMN `studentId`,
    ADD COLUMN `studentCourseId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `AssignmentSubmission` ADD CONSTRAINT `AssignmentSubmission_studentCourseId_fkey` FOREIGN KEY (`studentCourseId`) REFERENCES `StudentCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
