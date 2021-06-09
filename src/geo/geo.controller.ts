import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { GetCityDto, GetDistrictsDto } from './dto';
import { GeoService } from './geo.service';

@ApiTags('geocode')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('geocode')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @HttpCode(200)
  @Post('/get-districts')
  async getDistrictsOfCity(getDistrictsDto: GetDistrictsDto) {
    return await this.geoService.getDistrictsOfCity(getDistrictsDto);
  }

  @HttpCode(200)
  @Post('/get-city')
  async getCityFromLocation(getCityDto: GetCityDto) {
    return await this.geoService.getCityFromLocation(getCityDto);
  }
}
