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
  ApiBearerAuth,
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
import { InternalServerErrorResponseDto } from '../../../../../shared/dto/internal-server-error.dto';
import { MerchantJwtAuthGuard } from '../../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtRequest } from '../../../../../auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import {
  DeleteMenuItemNotFoundResponseDto,
  DeleteMenuItemResponseDto,
  FetchMenuItemQuery,
  GetMenuItemDetailResponseDto,
  GetMenuItemToppingsOfCurrentMenuItemResponseDto,
  UpdateMenuItemDto,
  UpdateMenuItemNotFoundResponseDto,
  UpdateMenuItemResponseDto,
  UpdateMenuItemToppingsOfCurrentMenuItemDto,
  UpdateMenuItemToppingsOfCurrentMenuItemResponseDto,
} from './dto';
import {
  CreateMenuItemConflictResponseDto,
  CreateMenuItemDto,
  CreateMenuItemResponseDto,
  FetchMenuItemByMenuResponseDto,
  FetchMenuItemByMenuUnauthorizedResponseDto,
} from './dto';
import { MenuItemService } from './menu-item.service';

@ApiTags('merchant/restaurant/menu/menu-item')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller(
  'user/merchant/:merchantId/restaurant/:restaurantId/menu/:menuId/menu-item',
)
export class MenuItemController {
  private logger = new Logger('MenuItemController');

  constructor(private menuItemService: MenuItemService) {}

  @ApiOkResponse({ type: FetchMenuItemByMenuResponseDto })
  @ApiUnauthorizedResponse({ type: FetchMenuItemByMenuUnauthorizedResponseDto })
  @ApiQuery({ type: FetchMenuItemQuery, required: false })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Query() fetchMenuItemByMenuQuery: FetchMenuItemQuery,
  ): Promise<FetchMenuItemByMenuResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuItemService.fetchMenuItem(
      merchantId,
      restaurant,
      menu,
      fetchMenuItemByMenuQuery,
    );
  }

  // Tao menu item
  @ApiCreatedResponse({ type: CreateMenuItemResponseDto })
  @ApiConflictResponse({ type: CreateMenuItemConflictResponseDto })
  @ApiBody({ type: CreateMenuItemDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post()
  async createMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ): Promise<CreateMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuItemService.createMenuItem(
      merchantId,
      restaurant,
      menu,
      createMenuItemDto,
    );
  }

  // Update menu item
  @ApiOkResponse({ type: UpdateMenuItemResponseDto })
  @ApiNotFoundResponse({ type: UpdateMenuItemNotFoundResponseDto })
  @ApiBody({ type: UpdateMenuItemDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Patch(':menuItemId')
  async updateMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuItemId') menuItem,
    @Param('menuId') menu,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<UpdateMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuItemService.updateMenuItem(
      menuItem,
      merchantId,
      restaurant,
      menu,
      updateMenuItemDto,
    );
  }

  // Delete menu item
  @ApiOkResponse({ type: DeleteMenuItemResponseDto })
  @ApiNotFoundResponse({ type: DeleteMenuItemNotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Delete(':menuItemId')
  async deleteMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuItemId') menuItem,
    @Param('menuId') menu,
  ): Promise<DeleteMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuItemService.deleteMenuItem(
      menuItem,
      merchantId,
      restaurant,
      menu,
    );
  }

  @ApiOkResponse({ type: GetMenuItemDetailResponseDto })
  @ApiNotFoundResponse({ type: DeleteMenuItemNotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get(':menuItemId')
  async getMenuItemDetail(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuItemId') menuItem,
    @Param('menuId') menu,
  ): Promise<GetMenuItemDetailResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }

    return await this.menuItemService.getMenuItemDetail(
      menuItem,
      merchantId,
      restaurant,
      menu,
    );
  }

  @ApiOkResponse({ type: GetMenuItemToppingsOfCurrentMenuItemResponseDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get(':menuItemId/topping-item')
  async fetchMenuItemToppingsOfCurrentMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant: string,
    @Param('restaurantId') restaurant: string,
    @Param('menuId') menu: string,
    @Param('menuItemId') menuItemId: string,
  ): Promise<GetMenuItemToppingsOfCurrentMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.menuItemService.fetchMenuItemToppingsOfCurrentMenuItem(
      merchantId,
      restaurant,
      menu,
      menuItemId,
    );
  }

  // Update menu item toppings
  @ApiOkResponse({
    type: UpdateMenuItemToppingsOfCurrentMenuItemResponseDto,
  })
  @ApiBody({ type: UpdateMenuItemToppingsOfCurrentMenuItemDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Put(':menuItemId/topping-item')
  async updateMenuToppingsOfCurrentMenuItem(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
    @Param('menuId') menu,
    @Param('menuItemId') menuItemId,
    @Body() updateToppingItemDto: UpdateMenuItemToppingsOfCurrentMenuItemDto,
  ): Promise<UpdateMenuItemToppingsOfCurrentMenuItemResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.menuItemService.updateMenuToppingsOfCurrentMenuItem(
      menuItemId,
      merchantId,
      restaurant,
      menu,
      updateToppingItemDto,
    );
  }
}
