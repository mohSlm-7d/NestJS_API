-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('INTERN_SOFTWARE_DEVELOPER', 'Software_Developer', 'SENIOR_SOFTWARE_DEVELOPER', 'MANAGER', 'SENIOR_MANAGER', 'DIRECTOR', 'SENIOR_DIRECTOR', 'EXECUTIVE_DIRECTOR', 'VICE_PRESIDENT', 'GENERAL_MANAGER');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL,
    "gender" "GENDER" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
