import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Profile {

    @Field(type => ID, { nullable: false })
    id: number;

    @Field(type => String, { nullable: false })
    avatar: string;

    @Field(type => String, { nullable: false })
    status: string;

    //  ...

    @Field(type => User, { nullable: true })
    user?: User
}
