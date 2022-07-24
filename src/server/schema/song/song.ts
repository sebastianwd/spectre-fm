import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
class Song {
  @Field()
  title: string

  @Field()
  artist!: string

  @Field({ nullable: true })
  album?: string

  @Field({ nullable: true })
  year?: string

  @Field({ nullable: true })
  duration?: string

  @Field({ nullable: true })
  genre?: string

  @Field(() => Int, { nullable: true })
  playlistId?: number | null
}

export default Song
