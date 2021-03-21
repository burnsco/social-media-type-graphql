import { Migration } from '@mikro-orm/migrations';

export class Migration20210321022333 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "online" bool not null;');
  }

}
