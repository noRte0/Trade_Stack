/*
  Warnings:

  - Made the column `lotsize` on table `TradeTechnique` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TradeTechnique" ALTER COLUMN "lotsize" SET NOT NULL;
