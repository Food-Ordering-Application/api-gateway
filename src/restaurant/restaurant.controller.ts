import { CustomerJwtAuthGuard } from 'src/auth/guards/jwts/jwt-auth.guard';
import { UpdateFavoriteRestaurantDto } from './dto/update-favorite-restaurant/update-favorite-restaurant.dto';
import { UpdateFavoriteRestaurantParamsDto } from './dto/update-favorite-restaurant/update-favorite-restaurant-params.dto';
import {
  Controller,
  Get,
  Body,
  Logger,
  Post,
  HttpCode,
  Param,
  Request,
  Query,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  GetMenuInformationResponseDto,
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantResponseDto,
  GetMenuItemToppingInfoResponseDto,
  GetMenuItemToppingDto,
  GetSomeRestaurantDto,
  GetToppingInfoOfAMenuResponseDto,
  GetToppingInfoOfAMenuDto,
  UpdateFavoriteRestaurantResponseDto,
} from './dto/index';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { OptionCustomerJwtAuthGuard } from 'src/auth/guards/jwts/optional-customer-jwt-auth.guard';

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
}
