import { Length } from "class-validator";
import { GraphQLURL } from "graphql-custom-types";
import { Field, InputType, Int } from "type-graphql";
import { Post } from "../../entities/Post";


@InputType()
export class PostInput implements Partial<Post> {
  @Field(() => Int)
  categoryId!: number;

  @Field(() => String)
  @Length(2, 300)
  title: string;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => GraphQLURL, { nullable: true })
  image?: string;

  @Field(() => GraphQLURL, { nullable: true })
  video?: string;

  @Field(() => GraphQLURL, { nullable: true })
  link?: string;
}


