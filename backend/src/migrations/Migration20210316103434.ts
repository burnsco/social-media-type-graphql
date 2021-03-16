import { Migration } from '@mikro-orm/migrations';

export class Migration20210316103434 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "roles";');
    this.addSql('alter table "user" drop column "status";');
  }

}
