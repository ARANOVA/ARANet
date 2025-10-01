-- AlterTable
ALTER TABLE `aranet_invoice` ADD COLUMN `freeze_at` DATETIME(0) NULL,
    ADD COLUMN `freeze_by` INTEGER NULL,
    ADD COLUMN `sent_at` DATETIME(0) NULL,
    ADD COLUMN `sent_by` INTEGER NULL,
    ADD COLUMN `sent_hash` VARCHAR(128) NULL,
    ADD COLUMN `signed_at` DATETIME(0) NULL,
    ADD COLUMN `signed_by` INTEGER NULL;
