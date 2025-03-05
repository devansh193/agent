ALTER TABLE "messages" ALTER COLUMN "resume_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "file_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "file_type" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "resume_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar(255);