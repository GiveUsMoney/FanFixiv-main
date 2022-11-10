import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Profile } from '@src/common/decorator/user.decorator';
import { ContentDto, ContentResultDto } from '@src/dto/content.dto';
import { UserProfile } from '@src/dto/user.dto';
import { ContentService } from './content.service';

/**
 * 컨텐츠 Controller
 *
 * - GET /content
 */
@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({
    type: ContentDto,
  })
  @ApiOkResponse({ type: ContentResultDto })
  async getContent(
    @Profile() profile: UserProfile | null,
    @Query() dto: ContentDto,
  ): Promise<ContentResultDto> {
    const items = await this.contentService.getContent(profile, dto);
    const contents = items.map((item) => {
      item.like = 99; // <- 더미 좋아요 기능. 후일 삭제 예정
      return item;
    });
    const count = Math.ceil(
      (await this.contentService.getContentCount()) / dto.count,
    );
    return new ContentResultDto(count, contents);
  }
}
