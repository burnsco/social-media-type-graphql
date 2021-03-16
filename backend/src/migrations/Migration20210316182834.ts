import { Migration } from '@mikro-orm/migrations';

export class Migration20210316182834 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "category_users" cascade;');
  }

}
