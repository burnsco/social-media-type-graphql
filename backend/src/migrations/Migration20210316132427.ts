import { Migration } from '@mikro-orm/migrations';

export class Migration20210316132427 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "private_message" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "body" varchar(255) not null, "sent_by_id" uuid not null);');
    this.addSql('alter table "private_message" add constraint "private_message_pkey" primary key ("id");');

    this.addSql('create table "user_private_messages" ("user_id" uuid not null, "private_message_id" uuid not null);');
    this.addSql('alter table "user_private_messages" add constraint "user_private_messages_pkey" primary key ("user_id", "private_message_id");');

    this.addSql('alter table "private_message" add constraint "private_message_sent_by_id_foreign" foreign key ("sent_by_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_private_messages" add constraint "user_private_messages_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_private_messages" add constraint "user_private_messages_private_message_id_foreign" foreign key ("private_message_id") references "private_message" ("id") on update cascade on delete cascade;');
  }

}
