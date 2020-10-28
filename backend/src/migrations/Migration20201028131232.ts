import { Migration } from "@mikro-orm/migrations"

export class Migration20201028131232 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "avatar" varchar(255) null, "about" varchar(255) null);'
    )
    this.addSql(
      'alter table "user" add constraint "user_pkey" primary key ("id");'
    )
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");'
    )
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");'
    )

    this.addSql(
      'create table "category" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);'
    )
    this.addSql(
      'alter table "category" add constraint "category_pkey" primary key ("id");'
    )
    this.addSql(
      'alter table "category" add constraint "category_name_unique" unique ("name");'
    )

    this.addSql(
      'create table "post" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "text" varchar(255) null, "link" varchar(255) null, "image" varchar(255) null, "video" varchar(255) null, "author_id" uuid not null, "category_id" uuid not null);'
    )
    this.addSql(
      'alter table "post" add constraint "post_pkey" primary key ("id");'
    )

    this.addSql(
      'create table "comment" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "body" varchar(255) not null, "created_by_id" uuid not null, "post_id" uuid null);'
    )
    this.addSql(
      'alter table "comment" add constraint "comment_pkey" primary key ("id");'
    )

    this.addSql(
      'create table "vote" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "value" int4 not null, "cast_by_id" uuid not null, "post_id" uuid null);'
    )
    this.addSql(
      'alter table "vote" add constraint "vote_pkey" primary key ("id");'
    )

    this.addSql(
      'alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table "post" add constraint "post_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table "comment" add constraint "comment_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table "vote" add constraint "vote_cast_by_id_foreign" foreign key ("cast_by_id") references "user" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "vote" add constraint "vote_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;'
    )
  }
}
