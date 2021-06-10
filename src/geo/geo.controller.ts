import { GetDistrictsResponseDto } from './dto/get-districts/get-districts-response.dto';
import { GetCitiesResponseDto } from './dto/get-all-cities/get-all-cities-response.dto';
import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { GetCityDto, GetCityResponseDto, GetDistrictsDto } from './dto';
import { GeoService } from './geo.service';
import { AnyJwtAuthGuard } from 'src/auth/guards/jwts/any-jwt-auth.guard';

@ApiTags('geocode')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('geocode')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @ApiOkResponse({ type: GetDistrictsResponseDto })
  @ApiBearerAuth()
  @UseGuards(AnyJwtAuthGuard)
  @HttpCode(200)
  @Post('/get-districts')
  async getDistrictsOfCity(
    getDistrictsDto: GetDistrictsDto,
  ): Promise<GetDistrictsResponseDto> {
    return await this.geoService.getDistrictsOfCity(getDistrictsDto);
  }

  @ApiOkResponse({ type: GetCityResponseDto })
  @ApiBearerAuth()
  @UseGuards(AnyJwtAuthGuard)
  @HttpCode(200)
  @Post('/get-city')
  async getCityFromLocation(
    getCityDto: GetCityDto,
  ): Promise<GetCityResponseDto> {
    return await this.geoService.getCityFromLocation(getCityDto);
  }

  @ApiOkResponse({ type: GetCitiesResponseDto })
  @ApiBearerAuth()
  @UseGuards(AnyJwtAuthGuard)
  @HttpCode(200)
  @Post('/get-cities')
  async getAllCities(): Promise<GetCitiesResponseDto> {
    return await this.geoService.getAllCities();
  }
}
