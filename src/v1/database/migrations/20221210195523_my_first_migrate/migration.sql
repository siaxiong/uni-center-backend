/*
  Warnings:

  - You are about to drop the column `aws_confirmed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `enrolled` on the `User` table. All the data in the column will be lost.
  - The values [ADMIN,PROFESSOR,STUDENT] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `aws_confirmed`,
    DROP COLUMN `enrolled`,
    ADD COLUMN `enrollmentStatus` ENUM('Accepted', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    MODIFY `role` ENUM('Admin', 'Professor', 'Student') NULL;
