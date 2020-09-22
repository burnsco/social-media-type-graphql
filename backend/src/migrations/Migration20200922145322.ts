import { Migration } from '@mikro-orm/migrations';

export class Migration20200922145322 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "chat_message" cascade;');
  }

}
