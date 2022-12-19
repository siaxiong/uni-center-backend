/*
  Warnings:

  - You are about to alter the column `grade` on the `Grade` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[professorId,userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assignmentId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_courseId_fkey`;

-- DropIndex
DROP INDEX `Student_courseId_userId_key` ON `Student`;

-- AlterTable
ALTER TABLE `Grade` ADD COLUMN `assignmentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `fileId` VARCHAR(191) NOT NULL,
    MODIFY `grade` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `courseId`,
    ADD COLUMN `professorId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `assigned_date` DATETIME(3) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `professorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Assignment_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Student_professorId_userId_key` ON `Student`(`professorId`, `userId`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
