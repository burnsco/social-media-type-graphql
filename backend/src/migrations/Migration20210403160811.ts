import { Migration } from '@mikro-orm/migrations';

export class Migration20210403160811 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" add column "avatar" varchar(255) null;');

    this.addSql('create table "user_chat_rooms" ("user_id" int4 not null, "category_id" int4 not null);');
    this.addSql('alter table "user_chat_rooms" add constraint "user_chat_rooms_pkey" primary key ("user_id", "category_id");');

    this.addSql('alter table "user_chat_rooms" add constraint "user_chat_rooms_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_chat_rooms" add constraint "user_chat_rooms_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');
  }

}
