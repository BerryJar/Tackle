
import { uniqueIndex } from "drizzle-orm/mysql-core";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const blogPosts = pgTable("blog_posts", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	authorId: text("author_id").notNull().references(() => userTable.id),
	content: text("content_path").notNull(),
	excerpt: text("excerpt").notNull(),
	publishedAt: timestamp("published_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	updatedAt: timestamp("updated_at", {withTimezone: true,mode: "date"}).notNull(),
	postVisible: boolean("post_visible").notNull().default(false),
	postDeleted: boolean("post_deleted").notNull().default(false),
})

export const tags = pgTable("blog_post_tags", {
	id: text("id").primaryKey(),
	postId: text("post_id").notNull().references(() => blogPosts.id),
	tag: text("tag").notNull(),
})


export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	hashedPassword: text("hashed_password"),
	displayName: text("display_name"),
	email: text("email").unique(),
	isEmailVerified: text("is_email_verified").notNull().default("false"),
	googleId: text("google_id").unique(),
	profilePicture: text("profile_picture"),
	darkMode: boolean("dark_mode").notNull().default(false),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	isPrivate: boolean("is_private").notNull().default(false),
	location: text("location"),
	bio: text("bio"),
	website: text("website"),
	occupation: text("occupation"),

});

export const emailVerificationTable = pgTable("email_verification", {

	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	code: text("code").notNull(),
	sentAt: timestamp("sent_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()


})

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

