import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Content } from '@src/interfaces/content.interface';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsInt, Min } from '@src/common/validator';
import { TagResultDto } from './tag.dto';
import { IsOptional } from 'class-validator';
import { BaseDto } from './base.dto';

export class ContentDto extends BaseDto {
  @IsInt()
  @Min(1)
  @Transform((x) => parseInt(x.value))
  @ApiProperty({
    description: '컨텐츠 카드 개수',
    type: Number,
    default: 10,
  })
  count = 10;

  @IsInt()
  @Min(1)
  @Transform((x) => parseInt(x.value))
  @ApiProperty({
    description: '몇번째 페이지',
    type: Number,
    default: 1,
  })
  page = 1;

  @IsInt({ each: true })
  @IsOptional()
  @Transform((x) => (x.value as string).split(',')?.map((v) => parseInt(v)))
  @ApiPropertyOptional({
    description: '검색할 태그 목록',
    type: String,
  })
  tags: number[];
}

@Exclude()
export class ContentCardDto extends BaseDto implements Content {
  @Expose()
  @ApiProperty({
    type: Number,
    description: '고유 아이디',
  })
  seq: number;

  @Expose()
  @ApiProperty({
    type: Date,
    description: '생성일자',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: String,
    description: '만화 제목',
  })
  title: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: '썸네일 링크',
  })
  thumbnail: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    description: '성인용 컨텐츠 여부',
  })
  isAdult: boolean;

  @Expose()
  @ApiProperty({
    type: Number,
    description: '좋아요 개수',
  })
  @Transform(({ value }) => parseInt(value))
  like: number;

  @Expose()
  @ApiProperty({
    type: Boolean,
    description: '좋아요 여부',
  })
  doLike: boolean;

  translateReview: string;

  @Expose()
  @Type(() => TagResultDto)
  @ApiProperty({
    type: [TagResultDto],
    description: '태그 목록',
  })
  tags: TagResultDto[];
}

export class ContentResultDto extends BaseDto {
  @ApiProperty({
    type: Number,
    description: '총 페이지 개수',
  })
  pageCount: number;

  @Type(() => ContentCardDto)
  @ApiProperty({
    type: [ContentCardDto],
    description: '컨텐츠 카드 목록',
  })
  content: ContentCardDto[];
}
