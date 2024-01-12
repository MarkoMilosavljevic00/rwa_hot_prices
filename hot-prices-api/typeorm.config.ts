import { Category } from 'src/models/entities/category.entity';
import { Comment } from 'src/models/entities/comment.entity';
import { Conversation } from 'src/models/entities/conversation.entity';
import { Coupon } from 'src/models/entities/coupon.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { Post } from 'src/models/entities/post.entity';
import { Reaction } from 'src/models/entities/reaction.entity';
import { Report } from 'src/models/entities/report.entity';
import { User } from 'src/models/entities/user.entity';
import { ConnectionOptions } from 'typeorm';

export const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: '192.168.99.101',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'hot-prices-db',
  entities: [
    User,
    Reaction,
    Post,
    Offer,
    Conversation,
    Coupon,
    Comment,
    Category,
    Report
  ],
  synchronize: true,
};
