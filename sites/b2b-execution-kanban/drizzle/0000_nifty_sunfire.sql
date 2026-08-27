CREATE TABLE `work_items` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`column` text NOT NULL,
	`assigned_to` text,
	`status` text DEFAULT 'Not started' NOT NULL,
	`due_date` text,
	`objective` text,
	`status_reason` text,
	`success_criteria` text,
	`dependencies` text DEFAULT '[]' NOT NULL,
	`tasks` text DEFAULT '[]' NOT NULL,
	`decisions` text DEFAULT '[]' NOT NULL,
	`links` text DEFAULT '[]' NOT NULL,
	`activity` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
