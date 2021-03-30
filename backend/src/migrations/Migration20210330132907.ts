import { Migration } from '@mikro-orm/migrations';

export class Migration20210330132907 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop constraint if exists "post_image_h_check";');
    this.addSql('alter table "post" alter column "image_h" type int4 using ("image_h"::int4);');
    this.addSql('alter table "post" drop constraint if exists "post_image_w_check";');
    this.addSql('alter table "post" alter column "image_w" type int4 using ("image_w"::int4);');
  }

}
