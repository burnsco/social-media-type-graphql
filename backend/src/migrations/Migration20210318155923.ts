import { Migration } from '@mikro-orm/migrations';

export class Migration20210318155923 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "message" drop constraint if exists "message_sent_by_id_check";');
    this.addSql('alter table "message" alter column "sent_by_id" type int4 using ("sent_by_id"::int4);');
    this.addSql('alter table "message" alter column "sent_by_id" set not null;');
  }

}
