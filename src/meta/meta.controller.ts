import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { MetaService } from './meta.service';

@ApiTags('meta')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}
  @HttpCode(200)
  @Get('/get-metadata')
  async getMetaData() {
    return await this.metaService.getMetaData();
  }
}
