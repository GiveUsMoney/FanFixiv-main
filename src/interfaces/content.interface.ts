import { Tag } from './tag.interface';

export interface Content {
  title: string;
  thumbnail: string;
  translateReview: string;
  isAdult: boolean;
  like: number;
  doLike: boolean;
  tags: Tag[];
}
