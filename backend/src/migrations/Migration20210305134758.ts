import { Migration } from '@mikro-orm/migrations';

export class Migration20210305134758 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "roles" text[] not null default \'{user}\', add column "status" text[] not null default \'{offline}\';');

    this.addSql('create table "user_friends" ("user_1_id" uuid not null, "user_2_id" uuid not null);');
    this.addSql('alter table "user_friends" add constraint "user_friends_pkey" primary key ("user_1_id", "user_2_id");');

    this.addSql('create table "message" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "content" varchar(255) not null, "sent_by_id" uuid not null, "sent_to_id" uuid null);');
    this.addSql('alter table "message" add constraint "message_pkey" primary key ("id");');

    this.addSql('alter table "post" drop column "image";');
    this.addSql('alter table "post" drop column "video";');

    this.addSql('alter table "user_friends" add constraint "user_friends_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_friends" add constraint "user_friends_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "message" add constraint "message_sent_by_id_foreign" foreign key ("sent_by_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message" add constraint "message_sent_to_id_foreign" foreign key ("sent_to_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user" add constraint "user_email_username_unique" unique ("email", "username");');
  }

}
