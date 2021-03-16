import { Migration } from '@mikro-orm/migrations';

export class Migration20210316140415 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "private_message" add column "sent_to_id" uuid null;');

    this.addSql('alter table "private_message" add constraint "private_message_sent_to_id_foreign" foreign key ("sent_to_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
