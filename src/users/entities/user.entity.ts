import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum UserAccountType {
  USER,
  MODERATOR,
  ADMIN,
}

export enum UserPremiumType {
  PREMIUM,
  PREMIUM_PLUS,
}

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column({
    default: 'hash!!!',
  })
  avatar: string;

  @Column()
  password: string;

  @Column()
  email?: string;

  @Column()
  phone_number?: string;

  @Column()
  verified?: boolean;

  @Column({
    type: 'enum',
    enum: UserAccountType,
    default: UserAccountType.USER,
  })
  role: UserAccountType;

  @Column({
    type: 'enum',
    enum: UserPremiumType,
  })
  premium?: UserPremiumType;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'string',
    // default: () => new Date().toISOString(),
    transformer: {
      from(timestamp: string) {
        return new Date(timestamp);
      },
      to(date: Date) {
        return date.toISOString();
      },
    },
  })
  updated_at?: Date;
}
