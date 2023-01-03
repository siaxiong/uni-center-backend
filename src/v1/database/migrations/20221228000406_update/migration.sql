/*
  Warnings:

  - A unique constraint covering the columns `[courseId,professorId]` on the table `ProfessorCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProfessorCourse_courseId_professorId_key` ON `ProfessorCourse`(`courseId`, `professorId`);
