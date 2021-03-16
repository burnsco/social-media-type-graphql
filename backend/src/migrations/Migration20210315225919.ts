import { Migration } from '@mikro-orm/migrations';

export class Migration20210315225919 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "chat_room" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "category_id" uuid not null);');
    this.addSql('alter table "chat_room" add constraint "chat_room_pkey" primary key ("id");');

    this.addSql('alter table "message" add column "chatroom_id" uuid null;');
    this.addSql('alter table "message" drop constraint "message_sent_to_id_foreign";');
    this.addSql('alter table "message" drop column "sent_to_id";');

    this.addSql('create table "user_chatrooms" ("user_id" uuid not null, "chat_room_id" uuid not null);');
    this.addSql('alter table "user_chatrooms" add constraint "user_chatrooms_pkey" primary key ("user_id", "chat_room_id");');

    this.addSql('alter table "chat_room" add constraint "chat_room_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "message" add constraint "message_chatroom_id_foreign" foreign key ("chatroom_id") references "chat_room" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_chatrooms" add constraint "user_chatrooms_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_chatrooms" add constraint "user_chatrooms_chat_room_id_foreign" foreign key ("chat_room_id") references "chat_room" ("id") on update cascade on delete cascade;');
  }

}
