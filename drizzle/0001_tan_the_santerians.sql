ALTER TABLE `builds` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `builds_slug_unique` ON `builds` (`slug`);