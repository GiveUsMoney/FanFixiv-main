import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { AWS_S3_BUCKET_NAME, s3 } from '@src/config/aws.config';
import { ProfileFormDto, ProfileFormResultDto } from '@src/dto/upload.dto';

@Injectable()
export class ProfileImgService {
  async toProfile(dto: ProfileFormDto): Promise<ProfileFormResultDto> {
    try {
      const realKey = dto.key.split('/').pop();

      await s3.send(
        new CopyObjectCommand({
          Bucket: AWS_S3_BUCKET_NAME,
          Key: 'profile/' + realKey,
          CopySource: AWS_S3_BUCKET_NAME + '/temp/' + realKey,
        }),
      );
      await s3.send(
        new DeleteObjectCommand({
          Bucket: AWS_S3_BUCKET_NAME,
          Key: dto.key,
        }),
      );

      return { status: 200, key: 'profile/' + realKey };
    } catch (e: unknown) {
      console.error(e);
      let message = null;
      if (e instanceof Error) message = e.message;
      return { status: 400, key: '', message };
    }
  }
}