/*
  Warnings:

  - Added the required column `Contract` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EntryPrice` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ExitPrice` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Leverage` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LongShort` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Note` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pip` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Timeframe` to the `TradeTechnique` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TradeTechnique" ADD COLUMN     "Contract" TEXT NOT NULL,
ADD COLUMN     "EntryPrice" TEXT NOT NULL,
ADD COLUMN     "ExitPrice" TEXT NOT NULL,
ADD COLUMN     "Leverage" TEXT NOT NULL,
ADD COLUMN     "LongShort" TEXT NOT NULL,
ADD COLUMN     "Note" TEXT NOT NULL,
ADD COLUMN     "Pip" TEXT NOT NULL,
ADD COLUMN     "Timeframe" TEXT NOT NULL;
