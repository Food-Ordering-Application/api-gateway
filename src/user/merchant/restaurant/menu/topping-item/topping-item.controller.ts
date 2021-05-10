import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MerchantJwtAuthGuard } from '../../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtRequest } from '../../../../../auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { InternalServerErrorResponseDto } from '../../../../../shared/dto/internal-server-error.dto';
import {
  CreateToppingItemConflictResponseDto,
  CreateToppingItemDto,
  CreateToppingItemResponseDto,
  DeleteToppingItemNotFoundResponseDto,
  DeleteToppingItemResponseDto,
  FetchMenuItemToppingsOfCurrentToppingItemResponseDto,
  FetchMenuItemToppingsOfCurrentToppingItemUnauthorizedResponseDto,
  FetchToppingItemByMenuResponseDto,
  FetchToppingItemByMenuUnauthorizedResponseDto,
  FetchToppingItemQuery,
  UpdateMenuItemToppingsOfCurrentToppingItemDto,
  UpdateMenuItemToppingsOfCurrentToppingItemNotFoundResponseDto,
  UpdateMenuItemToppingsOfCurrentToppingItemResponseDto,
  UpdateToppingItemDto,
  UpdateToppingItemNotFoundResponseDto,
  UpdateToppingItemResponseDto,
} from './dto';
import { ToppingItemService } from './topping-item.service';

@ApiTags('merchant/restaurant/menu/topping-item')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller(
  'user/merchant/:merchantId/restaurant/:restaurantId/menu/:menuId/topping-item',
)
export class ToppingItemController {
  private logger = new Logger('ToppingItemController');

  constructor(private toppingItemService: ToppingItemService) {}

  @ApiOkResponse({ type: FetchToppingItemByMenuResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchToppingItemByMenuUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchToppingItemQuery, required: false })
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchToppingItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Query() fetchToppingItemByMenuQuery: FetchToppingItemQuery,
  ): Promise<FetchToppingItemByMenuResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.toppingItemService.fetchToppingItem(
      merchantId,
      restaurant,
      menu,
      fetchToppingItemByMenuQuery,
    );
  }

  // Tao topping item
  @ApiCreatedResponse({ type: CreateToppingItemResponseDto })
  @ApiConflictResponse({ type: CreateToppingItemConflictResponseDto })
  @ApiBody({ type: CreateToppingItemDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createToppingItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Body() createToppingItemDto: CreateToppingItemDto,
  ): Promise<CreateToppingItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.toppingItemService.createToppingItem(
      merchantId,
      restaurant,
      menu,
      createToppingItemDto,
    );
  }

  // Update topping item
  @ApiOkResponse({ type: UpdateToppingItemResponseDto })
  @ApiNotFoundResponse({ type: UpdateToppingItemNotFoundResponseDto })
  @ApiBody({ type: UpdateToppingItemDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':toppingItemId')
  async updateToppingItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('toppingItemId') toppingItem,
    @Param('menuId') menu,
    @Body() updateToppingItemDto: UpdateToppingItemDto,
  ): Promise<UpdateToppingItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.toppingItemService.updateToppingItem(
      toppingItem,
      merchantId,
      restaurant,
      menu,
      updateToppingItemDto,
    );
  }

  // Delete topping item
  @ApiOkResponse({ type: DeleteToppingItemResponseDto })
  @ApiNotFoundResponse({ type: DeleteToppingItemNotFoundResponseDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Delete(':toppingItemId')
  async deleteToppingItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('toppingItemId') toppingItem,
    @Param('menuId') menu,
  ): Promise<DeleteToppingItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.toppingItemService.deleteToppingItem(
      toppingItem,
      merchantId,
      restaurant,
      menu,
    );
  }

  @ApiOkResponse({ type: FetchMenuItemToppingsOfCurrentToppingItemResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuItemToppingsOfCurrentToppingItemUnauthorizedResponseDto,
  })
  @UseGuards(MerchantJwtAuthGuard)
  @Get(':toppingItemId/menu-item')
  async fetchMenuItemToppingsOfCurrentToppingItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant: string,
    @Param('restaurantId') restaurant: string,
    @Param('menuId') menu: string,
    @Param('toppingItemId') toppingItem: string,
  ): Promise<FetchMenuItemToppingsOfCurrentToppingItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.toppingItemService.fetchMenuItemToppingsOfCurrentToppingItem(
      merchantId,
      restaurant,
      menu,
      toppingItem,
    );
  }

  // Update menu item toppings
  @ApiOkResponse({
    type: UpdateMenuItemToppingsOfCurrentToppingItemResponseDto,
  })
  @ApiNotFoundResponse({
    type: UpdateMenuItemToppingsOfCurrentToppingItemNotFoundResponseDto,
  })
  @ApiBody({ type: UpdateMenuItemToppingsOfCurrentToppingItemDto })
  @UseGuards(MerchantJwtAuthGuard)
  @Put(':toppingItemId/menu-item')
  async updateMenuToppingsOfCurrentToppingItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Param('toppingItemId') toppingItem,
    @Body() updateToppingItemDto: UpdateMenuItemToppingsOfCurrentToppingItemDto,
  ): Promise<UpdateMenuItemToppingsOfCurrentToppingItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.toppingItemService.updateMenuToppingsOfCurrentToppingItem(
      toppingItem,
      merchantId,
      restaurant,
      menu,
      updateToppingItemDto,
    );
  }
}
