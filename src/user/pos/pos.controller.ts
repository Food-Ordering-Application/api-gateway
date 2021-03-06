import { AuthService } from './../../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { PosLocalAuthGuard } from './../../auth/guards/locals/pos-local-auth.guard';
import {
  ConfirmOrderResponseDto,
  FetchDto,
  FetchMenuGroupOfRestaurantResponseDto,
  FetchMenuInformationUnauthorizedResponseDto,
  FetchMenuItemOfRestaurantResponseDto,
  FetchMenuItemToppingOfRestaurantResponseDto,
  FetchMenuResponseDto,
  FetchToppingGroupOfRestaurantResponseDto,
  FetchToppingItemOfRestaurantResponseDto,
  FinishOrderResponseDto,
  GetIsAutoConfirmOrderOkResponseDto,
  LoginPosDto,
  LoginPosResponseDto,
  LoginPosUnauthorizedResponseDto,
  SavePosOrderDto,
  SavePosOrderResponseDto,
  SavePosOrderUnauthorizedResponseDto,
  UpdateIsAutoConfirmOrderDto,
  UpdateIsAutoConfirmOrderOkResponseDto,
  UpdateMenuItemDto,
  UpdateMenuItemResponseDto,
  UpdateToppingItemDto,
  UpdateToppingItemResponseDto,
  VerifyAppKeyDto,
  VerifyAppKeyResponseDto,
  VerifyAppKeyUnauthorizedResponseDto,
  VoidOrderDto,
  VoidOrderResponseDto,
} from './dto';
import { PosService } from './pos.service';
import { PosJwtAuthGuard } from 'src/auth/guards/jwts/pos-jwt-auth.guard';
import { PosJwtRequest } from 'src/auth/strategies/jwt-strategies/pos-jwt-request.interface';
import { ForbiddenResponseDto } from '../customer/dto';

@ApiTags('pos')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/pos')
export class PosController {
  constructor(
    private posService: PosService,
    private authService: AuthService,
  ) {}

  // Đăng nhập Pos
  @ApiOkResponse({ type: LoginPosResponseDto })
  @ApiUnauthorizedResponse({ type: LoginPosUnauthorizedResponseDto })
  @ApiBody({ type: LoginPosDto })
  @ApiBearerAuth()
  @UseGuards(PosLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginPos(
    @Request() req,
    @Body() LoginPosDto: LoginPosDto,
  ): Promise<LoginPosResponseDto> {
    return this.authService.posLogin(req.user);
  }

  @ApiOkResponse({ type: VerifyAppKeyResponseDto })
  @ApiUnauthorizedResponse({
    type: VerifyAppKeyUnauthorizedResponseDto,
  })
  @ApiBody({ type: VerifyAppKeyDto })
  @HttpCode(200)
  @Post('/verify-app-key')
  async verifyPos(
    @Body() verifyAppKeyDto: VerifyAppKeyDto,
  ): Promise<VerifyAppKeyResponseDto> {
    return await this.posService.verifyAppKey(verifyAppKeyDto);
  }

  @ApiOkResponse({ type: FetchMenuResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuInformationUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchDto, required: false })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/menu')
  async fetchMenuOfRestaurant(@Request() req: PosJwtRequest) {
    const { user } = req;
    const { restaurantId } = user;
    return await this.posService.fetchMenuOfRestaurant(restaurantId);
  }

  @ApiOkResponse({ type: FetchMenuItemOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuInformationUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchDto, required: false })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/menu/:menuId/menu-item')
  async fetchMenuItem(
    @Request() req: PosJwtRequest,
    @Param('menuId') menu,
    @Query() fetchDto: FetchDto,
  ) {
    const { user } = req;
    const { restaurantId } = user;

    return await this.posService.fetchMenuItem(restaurantId, menu, fetchDto);
  }

  @ApiOkResponse({ type: FetchMenuGroupOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuInformationUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchDto, required: false })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/menu/:menuId/menu-group')
  async fetchMenuGroup(
    @Request() req: PosJwtRequest,
    @Param('menuId') menu,
    @Query() fetchDto: FetchDto,
  ) {
    const { user } = req;
    const { restaurantId } = user;

    return await this.posService.fetchMenuGroup(restaurantId, menu, fetchDto);
  }

  @ApiOkResponse({ type: FetchToppingItemOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuInformationUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchDto, required: false })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/menu/:menuId/topping-item')
  async fetchToppingItem(
    @Request() req: PosJwtRequest,
    @Param('menuId') menu,
    @Query() fetchDto: FetchDto,
  ) {
    const { user } = req;
    const { restaurantId } = user;

    return await this.posService.fetchToppingItem(restaurantId, menu, fetchDto);
  }

  @ApiOkResponse({ type: FetchToppingGroupOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuInformationUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchDto, required: false })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/menu/:menuId/topping-group')
  async fetchToppingGroup(
    @Request() req: PosJwtRequest,
    @Param('menuId') menu,
    @Query() fetchDto: FetchDto,
  ) {
    const { user } = req;
    const { restaurantId } = user;

    return await this.posService.fetchToppingGroup(
      restaurantId,
      menu,
      fetchDto,
    );
  }

  @ApiOkResponse({ type: FetchMenuItemToppingOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchMenuInformationUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchDto, required: false })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/menu/:menuId/menu-item-topping')
  async fetchMenuItemTopping(
    @Request() req: PosJwtRequest,
    @Param('menuId') menu,
    @Query() fetchDto: FetchDto,
  ) {
    const { user } = req;
    const { restaurantId } = user;

    return await this.posService.fetchMenuItemTopping(
      restaurantId,
      menu,
      fetchDto,
    );
  }

  @ApiOkResponse({ type: SavePosOrderResponseDto })
  @ApiUnauthorizedResponse({
    type: SavePosOrderUnauthorizedResponseDto,
  })
  @ApiBody({ type: SavePosOrderDto })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/order/save-order')
  async saveOrder(
    @Request() req: PosJwtRequest,
    @Body() savePosOrderDto: SavePosOrderDto,
  ): Promise<SavePosOrderResponseDto> {
    const dataRestaurantId = savePosOrderDto?.order?.restaurantId;

    const { user } = req;
    const { restaurantId } = user;

    if (!dataRestaurantId || restaurantId !== dataRestaurantId) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Cannot save order of another restaurant',
        data: null,
      };
    }

    return await this.posService.savePosOrder(savePosOrderDto);
  }

  @ApiOkResponse({ type: ConfirmOrderResponseDto })
  @UseGuards(PosJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/order/:orderId/confirm')
  async confirmDeliveryOrder(
    @Request() req: PosJwtRequest,
    @Param('orderId') orderId: string,
  ): Promise<ConfirmOrderResponseDto> {
    const { user } = req;
    const { restaurantId, staffId } = user;
    return await this.posService.confirmDeliveryOrder(
      orderId,
      staffId,
      restaurantId,
    );
  }

  @ApiOkResponse({ type: FinishOrderResponseDto })
  @UseGuards(PosJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/order/:orderId/finish')
  async finishDeliveryOrder(
    @Request() req: PosJwtRequest,
    @Param('orderId') orderId: string,
  ): Promise<FinishOrderResponseDto> {
    const { user } = req;
    const { restaurantId } = user;
    return await this.posService.finishDeliveryOrder(orderId, restaurantId);
  }

  @ApiOkResponse({ type: VoidOrderResponseDto })
  @UseGuards(PosJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/order/:orderId/void')
  async voidDeliveryOrder(
    @Request() req: PosJwtRequest,
    @Param('orderId') orderId: string,
    @Body() voidOrderDto: VoidOrderDto,
  ): Promise<VoidOrderResponseDto> {
    const { user } = req;
    const { restaurantId, staffId } = user;
    return await this.posService.voidDeliveryOrder(
      orderId,
      staffId,
      restaurantId,
      voidOrderDto,
    );
  }

  // Update menu item
  @ApiOkResponse({ type: UpdateMenuItemResponseDto })
  @ApiBody({ type: UpdateMenuItemDto })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Patch('menu-item/:menuItemId')
  async updateMenuItem(
    @Request() req: PosJwtRequest,
    @Param('menuItemId') menuItem,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<UpdateMenuItemResponseDto> {
    const { user } = req;
    const { restaurantId, staffId } = user;
    return await this.posService.updateMenuItem(
      menuItem,
      restaurantId,
      updateMenuItemDto,
    );
  }

  @ApiOkResponse({ type: UpdateToppingItemResponseDto })
  @ApiBody({ type: UpdateToppingItemDto })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Patch('topping-item/:toppingItemId')
  async updateToppingItem(
    @Request() req: PosJwtRequest,
    @Param('toppingItemId') toppingItem,
    @Body() updateToppingItemDto: UpdateToppingItemDto,
  ): Promise<UpdateToppingItemResponseDto> {
    const { user } = req;
    const { restaurantId, staffId } = user;
    return await this.posService.updateToppingItem(
      toppingItem,
      restaurantId,
      updateToppingItemDto,
    );
  }

  //! Update thông tin isAutoConfirmOrder của merchant
  @ApiOkResponse({ type: UpdateIsAutoConfirmOrderOkResponseDto })
  @ApiQuery({ type: UpdateIsAutoConfirmOrderDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Patch('/update-isautoconfirm')
  async updateIsAutoConfirmOrder(
    @Request() req,
    @Query()
    updateIsAutoConfirmOrderDto: UpdateIsAutoConfirmOrderDto,
  ): Promise<UpdateIsAutoConfirmOrderOkResponseDto> {
    return this.posService.updateIsAutoConfirmOrder(
      req.user.restaurantId,
      updateIsAutoConfirmOrderDto,
    );
  }

  //! Fetch thông tin isAutoConfirmOrder của merchant
  @ApiOkResponse({ type: GetIsAutoConfirmOrderOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(PosJwtAuthGuard)
  @Get('/get-isautoconfirm')
  async getIsAutoConfirmOrder(
    @Request() req,
  ): Promise<GetIsAutoConfirmOrderOkResponseDto> {
    return this.posService.getIsAutoConfirmOrder(req.user.restaurantId);
  }
}
