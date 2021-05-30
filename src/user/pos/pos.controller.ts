import { AuthService } from './../../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
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
  LoginPosDto,
  LoginPosResponseDto,
  LoginPosUnauthorizedResponseDto,
  SavePosOrderDto,
  SavePosOrderResponseDto,
  SavePosOrderUnauthorizedResponseDto,
  VerifyAppKeyDto,
  VerifyAppKeyResponseDto,
  VerifyAppKeyUnauthorizedResponseDto,
  VoidOrderDto,
  VoidOrderResponseDto,
} from './dto';
import { PosService } from './pos.service';
import { PosJwtAuthGuard } from 'src/auth/guards/jwts/pos-jwt-auth.guard';
import { PosJwtRequest } from 'src/auth/strategies/jwt-strategies/pos-jwt-request.interface';

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
}
