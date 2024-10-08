-- CreateTable
CREATE TABLE "TradeTechnique" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "technique" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeTechnique_userId_technique_key" ON "TradeTechnique"("userId", "technique");

-- AddForeignKey
ALTER TABLE "TradeTechnique" ADD CONSTRAINT "TradeTechnique_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
