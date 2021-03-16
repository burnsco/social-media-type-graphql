import { Migration } from '@mikro-orm/migrations';

export class Migration20210316102807 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_status_check";');
    this.addSql('alter table "user" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "user" add constraint "user_status_check" check ("status" in (\'online\', \'offline\'));');
    this.addSql('alter table "user" alter column "status" drop default;');

    this.addSql('alter table "message" add column "category_id" uuid null;');
    this.addSql('alter table "message" drop constraint "message_chatroom_id_foreign";');
    this.addSql('alter table "message" drop column "chatroom_id";');

    this.addSql('alter table "post" add column "image" varchar(255) null, add column "image_h" varchar(255) null, add column "image_w" varchar(255) null;');

    this.addSql('create table "category_users" ("category_id" uuid not null, "user_id" uuid not null);');
    this.addSql('alter table "category_users" add constraint "category_users_pkey" primary key ("category_id", "user_id");');

    this.addSql('alter table "message" add constraint "message_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "category_users" add constraint "category_users_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "category_users" add constraint "category_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "chat_room" cascade;');

    this.addSql('drop table if exists "user_chatrooms" cascade;');
  }

}
