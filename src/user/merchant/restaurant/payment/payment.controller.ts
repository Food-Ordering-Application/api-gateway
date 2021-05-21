import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { MerchantJwtAuthGuard } from '../../../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantJwtPayload } from '../../../../auth/strategies/jwt-strategies/merchant-jwt-payload.interface';
import { InternalServerErrorResponseDto } from '../../../../shared/dto/internal-server-error.dto';
import {
  AddPaypalPaymentDto,
  AddPaypalPaymentResponseDto,
  FetchPaymentOfRestaurantResponseDto,
  FetchPaymentOfRestaurantUnauthorizedResponseDto,
  GetPayPalOnboardStatusResponseDto,
  GetPayPalSignUpLinkDto,
  GetPayPalSignUpLinkResponseDto,
} from './dto';
import { PaymentService } from './payment.service';

@ApiTags('merchant/restaurant/payment')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant/:merchantId/restaurant/:restaurantId/payment')
export class PaymentController {
  private logger = new Logger('PaymentController');

  constructor(private paymentService: PaymentService) {}

  @ApiOkResponse({ type: FetchPaymentOfRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchPaymentOfRestaurantUnauthorizedResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get()
  async fetchPaymentOfRestaurant(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ): Promise<FetchPaymentOfRestaurantResponseDto> {
    const { user } = req;
    const { merchantId } = user;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.paymentService.fetchPaymentOfRestaurant(
      merchantId,
      restaurant,
    );
  }

  @ApiOkResponse({ type: AddPaypalPaymentResponseDto })
  @ApiBody({ type: AddPaypalPaymentDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post('/paypal')
  async addPaypalPayment(
    @Req() req,
    @Payload() addPaypalPaymentDto: AddPaypalPaymentDto,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ): Promise<AddPaypalPaymentResponseDto> {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
      };
    }
    return await this.paymentService.addPaypalPayment(
      merchant,
      restaurant,
      addPaypalPaymentDto,
    );
  }

  @ApiOkResponse({ type: GetPayPalSignUpLinkResponseDto })
  @ApiBody({ type: GetPayPalSignUpLinkDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Post('/paypal/get-signup-link')
  async getPayPalSignUpLink(
    @Req() req,
    @Payload() getPayPalSignUpLinkDto: GetPayPalSignUpLinkDto,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ): Promise<GetPayPalSignUpLinkResponseDto> {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.paymentService.getPayPalSignUpLink(
      merchant,
      restaurant,
      getPayPalSignUpLinkDto,
    );
  }

  @ApiOkResponse({ type: GetPayPalOnboardStatusResponseDto })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get('/paypal/onboard-status')
  async getPayPalOnboardStatus(
    @Req() req,
    @Param('merchantId') merchant,
    @Param('restaurantId') restaurant,
  ): Promise<GetPayPalOnboardStatusResponseDto> {
    const merchantPayload: MerchantJwtPayload = req.user;
    const { merchantId } = merchantPayload;
    if (merchantId !== merchant) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.paymentService.getPayPalOnboardStatus(
      merchant,
      restaurant,
    );
  }
}
