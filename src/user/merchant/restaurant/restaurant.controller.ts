import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { InternalServerErrorResponseDto } from '../../../shared/dto/internal-server-error.dto';
import { MerchantJwtAuthGuard } from './../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtPayload } from './../../../auth/strategies/jwt-strategies/merchant-jwt-payload.interface';
import {
  CreateRestaurantResponseDto,
  FetchRestaurantDetailOfMerchantResponseDto,
  FetchRestaurantDto,
  GetOrderStatisticsOfRestaurantDto,
  GetOrderStatisticsOfRestaurantResponseDto,
  GetRevenueInsightOfRestaurantDto,
  GetRevenueInsightOfRestaurantResponseDto,
  GetRestaurantStatisticResponseDto,
  UpdateRestaurantDto,
  UpdateRestaurantNotFoundResponseDto,
  UpdateRestaurantResponseDto,
} from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant/create-restaurant.dto';
import { FetchRestaurantsOfMerchantResponseDto } from './dto/fetch-restaurant/fetch-restaurant-response.dto';
import { FetchRestaurantsOfMerchantUnauthorizedResponseDto } from './dto/fetch-restaurant/fetch-restaurant-unauthorized-response.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('merchant/restaurant')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant')
export class RestaurantController {
  private logger = new Logger('RestaurantController');

  constructor(private restaurantService: RestaurantService) {}

  @ApiOkResponse({ type: FetchRestaurantsOfMerchantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchRestaurantsOfMerchantUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchRestaurantDto, required: false })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchRestaurantsOfMerchant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Query() fetchRestaurantByMerchantDto: FetchRestaurantDto,
  ): Promise<FetchRestaurantsOfMerchantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.fetchRestaurantsOfMerchant(
      merchantId,
      fetchRestaurantByMerchantDto,
    );
  }

  @ApiCreatedResponse({ type: CreateRestaurantResponseDto })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createRestaurant(
    @Req() req,
    @Payload() createRestaurantDto: CreateRestaurantDto,
    @Param('merchantId') merchant,
  ) {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.createRestaurant(
      merchantId,
      createRestaurantDto,
    );
  }

  @ApiOkResponse({ type: FetchRestaurantDetailOfMerchantResponseDto })
  @ApiNotFoundResponse({
    type: FetchRestaurantsOfMerchantUnauthorizedResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get(':restaurantId')
  async fetchRestaurantDetailOfMerchant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ): Promise<FetchRestaurantDetailOfMerchantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.fetchRestaurantDetailOfMerchant(
      restaurant,
      merchantId,
    );
  }

  @ApiOkResponse({ type: GetRestaurantStatisticResponseDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get(':restaurantId/statistic')
  async GetRestaurantStatistic(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ): Promise<GetRestaurantStatisticResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.getRestaurantStatistic(
      merchant,
      restaurant,
    );
  }

  @ApiOkResponse({ type: GetOrderStatisticsOfRestaurantResponseDto })
  @ApiBody({ type: GetOrderStatisticsOfRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post(':restaurantId/order-statistics')
  @HttpCode(200)
  async getOrderStatisticsOfRestaurant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Body()
    getOrderStatisticsOfRestaurantDto: GetOrderStatisticsOfRestaurantDto,
  ) {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.getOrderStatisticsOfRestaurant(
      restaurant,
      merchantId,
      getOrderStatisticsOfRestaurantDto,
    );
  }

  @ApiOkResponse({ type: GetRevenueInsightOfRestaurantResponseDto })
  @ApiBody({ type: GetRevenueInsightOfRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post(':restaurantId/revenue-insight')
  @HttpCode(200)
  async getRevenueInsightOfRestaurant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Body() getRevenueInsightOfRestaurantDto: GetRevenueInsightOfRestaurantDto,
  ) {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.restaurantService.getRevenueInsightOfRestaurant(
      restaurant,
      merchantId,
      getRevenueInsightOfRestaurantDto,
    );
  }

  @ApiOkResponse({ type: UpdateRestaurantResponseDto })
  @ApiNotFoundResponse({ type: UpdateRestaurantNotFoundResponseDto })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':restaurantId')
  async updateRestaurant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<UpdateRestaurantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.restaurantService.updateRestaurant(
      merchantId,
      restaurant,
      updateRestaurantDto,
    );
  }
}
