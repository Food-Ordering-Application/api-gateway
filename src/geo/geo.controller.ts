import { GetDistrictsResponseDto } from './dto/get-districts/get-districts-response.dto';
import { GetCitiesResponseDto } from './dto/get-all-cities/get-all-cities-response.dto';
import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { GetCityDto, GetCityResponseDto, GetDistrictsDto } from './dto';
import { GeoService } from './geo.service';

@ApiTags('geocode')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('geocode')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @ApiOkResponse({ type: GetDistrictsResponseDto })
  @HttpCode(200)
  @Post('/get-districts')
  async getDistrictsOfCity(
    getDistrictsDto: GetDistrictsDto,
  ): Promise<GetDistrictsResponseDto> {
    return await this.geoService.getDistrictsOfCity(getDistrictsDto);
  }

  @ApiOkResponse({ type: GetCityResponseDto })
  @HttpCode(200)
  @Post('/get-city')
  async getCityFromLocation(
    getCityDto: GetCityDto,
  ): Promise<GetCityResponseDto> {
    return await this.geoService.getCityFromLocation(getCityDto);
  }

  @ApiOkResponse({ type: GetCitiesResponseDto })
  @HttpCode(200)
  @Post('/get-cities')
  async getAllCities(): Promise<GetCitiesResponseDto> {
    return await this.geoService.getAllCities();
  }
}
