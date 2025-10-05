ALTER TABLE sf_guard_user_profile ALTER COLUMN birthday DROP DEFAULT;
ALTER TABLE `aranet_invoice`
    ADD COLUMN `freeze_at` DATETIME(0) NULL,
    ADD COLUMN `freeze_by` INTEGER NULL,
    ADD COLUMN `sent_at` DATETIME(0) NULL,
    ADD COLUMN `sent_by` INTEGER NULL,
    ADD COLUMN `sent_hash` VARCHAR(128) NULL,
    ADD COLUMN `signed_at` DATETIME(0) NULL,
    ADD COLUMN `signed_by` INTEGER NULL,
    ADD COLUMN `anulated_at` DATETIME(0) NULL,
    ADD COLUMN `anulated_by` INTEGER NULL,
    ADD COLUMN `anulated_id` INTEGER NULL,
    ADD COLUMN `anulated_reason` TEXT NULL,
    ADD COLUMN `sent_response_code` INTEGER NULL,
    ADD COLUMN `sent_response_data` TEXT NULL,
    ADD COLUMN `sent_response_message` TEXT NULL;
