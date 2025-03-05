ALTER TABLE "messages" RENAME COLUMN "id" TO "message_id";--> statement-breakpoint
ALTER TABLE "resumes" RENAME COLUMN "id" TO "resume_id";--> statement-breakpoint
ALTER TABLE "reviews" RENAME COLUMN "id" TO "review_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id" TO "users_id";--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_resume_id_resumes_id_fk";
--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "resumes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_resume_id_resumes_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_resume_id_resumes_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("resume_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("users_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_resume_id_resumes_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("resume_id") ON DELETE cascade ON UPDATE no action;