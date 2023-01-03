/*
  Warnings:

  - A unique constraint covering the columns `[studentId,professorCourseId]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `StudentCourse_studentId_professorCourseId_key` ON `StudentCourse`(`studentId`, `professorCourseId`);
