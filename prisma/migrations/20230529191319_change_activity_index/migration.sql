-- DropIndex
DROP INDEX "Activity_startsAt_idx";

-- CreateIndex
CREATE INDEX "Activity_id_startsAt_endsAt_idx" ON "Activity"("id", "startsAt", "endsAt");
