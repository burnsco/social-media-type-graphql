import { Migration } from '@mikro-orm/migrations';

export class Migration20201027152812 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comment" drop constraint if exists "comment_post_id_check";');
    this.addSql('alter table "comment" alter column "post_id" type int4 using ("post_id"::int4);');
    this.addSql('alter table "comment" alter column "post_id" drop not null;');

    this.addSql('alter table "vote" drop constraint if exists "vote_post_id_check";');
    this.addSql('alter table "vote" alter column "post_id" type int4 using ("post_id"::int4);');
    this.addSql('alter table "vote" alter column "post_id" drop not null;');
  }

}
