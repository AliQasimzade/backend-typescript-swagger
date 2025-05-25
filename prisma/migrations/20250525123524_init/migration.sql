-- CreateTable
CREATE TABLE `Module` (
    `id_hash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `display_order` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Module_key_key`(`key`),
    PRIMARY KEY (`id_hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModulePage` (
    `id_hash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `display_order` INTEGER NOT NULL,
    `moduleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ModulePage_key_key`(`key`),
    PRIMARY KEY (`id_hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id_hash` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id_hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ModulePage` ADD CONSTRAINT `ModulePage_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id_hash`) ON DELETE RESTRICT ON UPDATE CASCADE;
