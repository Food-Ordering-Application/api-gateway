import { GetFavoriteRestaurantsResponseDto } from './dto/get-favorite-restaurants/get-favorite-restaurants-response.dto';
import { GetFavoriteRestaurantsQueryParamsDto } from './dto/get-favorite-restaurants/get-favorite-restaurants-query-params.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerJwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import { OptionCustomerJwtAuthGuard } from 'src/auth/guards/jwts/optional-customer-jwt-auth.guard';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import {
  GetMenuInformationResponseDto,
  GetMenuItemToppingDto,
  GetMenuItemToppingInfoResponseDto,
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantDto,
  GetSomeRestaurantResponseDto,
  GetToppingInfoOfAMenuDto,
  GetToppingInfoOfAMenuResponseDto,
  UpdateFavoriteRestaurantResponseDto,
} from './dto/index';
import { UpdateFavoriteRestaurantParamsDto } from './dto/update-favorite-restaurant/update-favorite-restaurant-params.dto';
import { UpdateFavoriteRestaurantDto } from './dto/update-favorite-restaurant/update-favorite-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('restaurant')
export class RestaurantController {
  private logger = new Logger('RestaurantController');

  constructor(private readonly restaurantService: RestaurantService) {}

  // Danh sách 25 nhà hàng
  // Có thể lọc theo loại StreetFood,CafeDessert,Restaurant,Veterian
  // Chắc chắn lọc theo area
  @ApiOkResponse({ type: GetSomeRestaurantResponseDto })
  @HttpCode(200)
  @Post('/some-restaurant')
  getSomeRestaurant(
    @Body() getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<GetSomeRestaurantResponseDto> {
    return this.restaurantService.getSomeRestaurant(getSomeRestaurantDto);
  }

  // Lấy thông tin chi tiết 1 nhà hàng
  @UseGuards(OptionCustomerJwtAuthGuard)
  @ApiOkResponse({ type: GetRestaurantInformationResponseDto })
  @Get('/:restaurantId')
  getRestaurantInformation(
    @Request() req,
    @Param() params,
  ): Promise<GetRestaurantInformationResponseDto> {
    const { restaurantId } = params;
    const customerId = req.user?.userId;
    return this.restaurantService.getRestaurantInformation(
      restaurantId,
      customerId,
    );
  }

  // Lấy thông tin về Menu, MenuGroup, MenuItems của nhà hàng
  @ApiOkResponse({ type: GetMenuInformationResponseDto })
  @Get('/:restaurantId/get-menu-information')
  getMenuInformation(@Param() params): Promise<GetMenuInformationResponseDto> {
    const { restaurantId } = params;
    return this.restaurantService.getMenuInformation(restaurantId);
  }

  // Lấy thông tin về MenuItemTopping, ToppingGroup của 1 MenuItem
  @ApiOkResponse({ type: GetMenuItemToppingInfoResponseDto })
  @ApiBody({ type: GetMenuItemToppingDto })
  @HttpCode(200)
  @Post('/get-menu-item-topping-info')
  getMenuItemToppingInfo(
    @Body() getMenuItemToppingDto: GetMenuItemToppingDto,
  ): Promise<GetMenuItemToppingInfoResponseDto> {
    return this.restaurantService.getMenuItemToppingInfo(
      getMenuItemToppingDto.menuItemId,
    );
  }

  // Lấy thông tin về Menu, MenuGroup, MenuItems của nhà hàng
  @ApiOkResponse({ type: GetToppingInfoOfAMenuResponseDto })
  @ApiQuery({ type: GetToppingInfoOfAMenuDto })
  @Get('/:restaurantId/get-topping-info')
  getToppingInfoOfAMenu(
    @Param() params,
    @Query()
    getAllRestaurantOrderDto: GetToppingInfoOfAMenuDto,
  ): Promise<GetToppingInfoOfAMenuResponseDto> {
    const { restaurantId } = params;
    return this.restaurantService.getToppingInfoOfAMenu(
      getAllRestaurantOrderDto,
      restaurantId,
    );
  }

  @ApiOkResponse({ type: UpdateFavoriteRestaurantResponseDto })
  @ApiBody({ type: UpdateFavoriteRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Put('/:restaurantId/favorite')
  async updateFavoriteRestaurant(
    @Req() req,
    @Param() params: UpdateFavoriteRestaurantParamsDto,
    @Body() updateFavoriteRestaurantDto: UpdateFavoriteRestaurantDto,
  ): Promise<UpdateFavoriteRestaurantResponseDto> {
    const { restaurantId } = params;
    const customerId: string = req.user.userId;
    return this.restaurantService.updateFavoriteRestaurant(
      restaurantId,
      customerId,
      updateFavoriteRestaurantDto,
    );
  }

  @ApiOkResponse({ type: GetFavoriteRestaurantsResponseDto })
  @ApiQuery({ type: GetFavoriteRestaurantsQueryParamsDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Get('/get-favorite-infos')
  async getFavoriteRestaurants(
    @Req() req,
    @Query() query: GetFavoriteRestaurantsQueryParamsDto,
  ): Promise<GetFavoriteRestaurantsResponseDto> {
    const { page: pageString, size: sizeString } = query;
    const page = parseInt(pageString);
    const size = parseInt(sizeString);
    const customerId: string = req.user.userId;
    return await this.restaurantService.getFavoriteRestaurants(customerId, {
      page,
      size,
    });
  }
}
