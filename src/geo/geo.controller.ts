import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnyJwtAuthGuard } from 'src/auth/guards/jwts/any-jwt-auth.guard';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { GetCityDto, GetCityResponseDto, GetDistrictsDto } from './dto';
import { GetCitiesResponseDto } from './dto/get-all-cities/get-all-cities-response.dto';
import { GetDistrictsResponseDto } from './dto/get-districts/get-districts-response.dto';
import { GeoService } from './geo.service';

@ApiTags('geocode')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('geocode')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @ApiOkResponse({ type: GetDistrictsResponseDto })
  @ApiBearerAuth()
  @ApiBody({ type: GetDistrictsDto })
  @UseGuards(AnyJwtAuthGuard)
  @HttpCode(200)
  @Post('/get-districts')
  async getDistrictsOfCity(
    @Body() getDistrictsDto: GetDistrictsDto,
  ): Promise<GetDistrictsResponseDto> {
    return await this.geoService.getDistrictsOfCity(getDistrictsDto);
  }

  @ApiOkResponse({ type: GetCityResponseDto })
  @ApiBearerAuth()
  @ApiBody({ type: GetCityDto })
  @UseGuards(AnyJwtAuthGuard)
  @HttpCode(200)
  @Post('/get-city')
  async getCityFromLocation(
    @Body() getCityDto: GetCityDto,
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
