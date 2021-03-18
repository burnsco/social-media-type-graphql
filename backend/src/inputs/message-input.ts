import { Field, InputType, Int } from "type-graphql"
import { Message } from "../entities"

@InputType()
export default class MessageInput implements Partial<Message> {
  content: string

  @Field(() => Int)
  categoryId: number
}
