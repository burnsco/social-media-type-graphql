import { Migration } from "@mikro-orm/migrations"

export class Migration20201028200449 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "base" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    )
    this.addSql(
      'alter table "base" add constraint "base_pkey" primary key ("id");'
    )
  }
}
