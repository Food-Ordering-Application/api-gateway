import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { AuthService } from '../../auth/auth.service';
import { DriverJwtAuthGuard } from '../../auth/guards/jwts/driver-jwt-auth.guard';
import { DriverLocalAuthGuard } from '../../auth/guards/locals/driver-local-auth.guard';
import { ForbiddenResponseDto } from '../customer/dto';
import { DriverService } from './driver.service';
import {
  ApproveDepositMoneyIntoMainAccountWalletDto,
  ApproveDepositMoneyIntoMainAccountWalletOkResponseDto,
  DepositMoneyIntoMainAccountWalletDto,
  DepositMoneyIntoMainAccountWalletOkResponseDto,
  LoginDriverDto,
  LoginDriverResponseDto,
  LoginDriverUnauthorizedResponseDto,
  RegisterDriverConflictResponseDto,
  RegisterDriverCreatedResponseDto,
  RegisterDriverDto,
  WithdrawMoneyToPaypalAccountDto,
  WithdrawMoneyToPaypalAccountOkResponseDto,
} from './dto';

const MOCK_DRIVER_ID = 'a22f3f78-be7f-11eb-8529-0242ac130003';
@ApiTags('driver')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
    private authService: AuthService,
  ) {}

  @HttpCode(200)
  @Post('/order/:orderId/accept')
  async acceptOrder(@Param('orderId') orderId: string) {
    const driverId = MOCK_DRIVER_ID;
    return await this.driverService.acceptOrder(driverId, orderId);
  }

  @HttpCode(200)
  @Post('/order/:orderId/pickup')
  async pickUpOrder(@Param('orderId') orderId: string) {
    const driverId = MOCK_DRIVER_ID;
    return await this.driverService.pickUpOrder(driverId, orderId);
  }

  @HttpCode(200)
  @Post('/order/:orderId/complete')
  async completeOrder(@Param('orderId') orderId: string) {
    const driverId = MOCK_DRIVER_ID;
    return await this.driverService.completeOrder(driverId, orderId);
  }

  //! Đăng nhập driver
  @ApiOkResponse({ type: LoginDriverResponseDto })
  @ApiUnauthorizedResponse({ type: LoginDriverUnauthorizedResponseDto })
  @ApiBody({ type: LoginDriverDto })
  @UseGuards(DriverLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginDriver(@Request() req): Promise<LoginDriverResponseDto> {
    return this.authService.driverLogin(req.user);
  }

  //! Đăng ký driver
  @ApiCreatedResponse({ type: RegisterDriverCreatedResponseDto })
  @ApiConflictResponse({ type: RegisterDriverConflictResponseDto })
  @ApiBody({ type: RegisterDriverDto })
  @Post()
  async registerDriver(
    @Body() registerDriverDto: RegisterDriverDto,
  ): Promise<RegisterDriverCreatedResponseDto> {
    return this.driverService.registerDriver(registerDriverDto);
  }

  //! CreateOrder Nạp tiền vào tài khoản chính driver
  @ApiOkResponse({ type: DepositMoneyIntoMainAccountWalletOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBody({ type: DepositMoneyIntoMainAccountWalletDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(DriverJwtAuthGuard)
  @Post('/:driverId/create-deposit-money-to-main-wallet')
  async depositMoneyIntoMainAccountWallet(
    @Request() req,
    @Param() params,
    @Body()
    depositMoneyIntoMainAccountWalletDto: DepositMoneyIntoMainAccountWalletDto,
  ): Promise<DepositMoneyIntoMainAccountWalletOkResponseDto> {
    const { driverId } = params;
    return this.driverService.depositMoneyIntoMainAccountWallet(
      driverId,
      req.user.userId,
      depositMoneyIntoMainAccountWalletDto,
    );
  }

  //! ApproveOrder Nạp tiền vào tài khoản chính driver
  @ApiOkResponse({
    type: ApproveDepositMoneyIntoMainAccountWalletOkResponseDto,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBody({ type: ApproveDepositMoneyIntoMainAccountWalletDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Patch('/:driverId/approve-deposit-money-to-main-wallet')
  async approveDepositMoneyIntoMainAccountWallet(
    @Request() req,
    @Param() params,
    @Body()
    approveDepositMoneyIntoMainAccountWalletDto: ApproveDepositMoneyIntoMainAccountWalletDto,
  ): Promise<ApproveDepositMoneyIntoMainAccountWalletOkResponseDto> {
    const { driverId } = params;
    return this.driverService.approveDepositMoneyIntoMainAccountWallet(
      approveDepositMoneyIntoMainAccountWalletDto,
      driverId,
      req.user.userId,
    );
  }

  //! Rút tiền từ ví vào tài khoản paypal của driver
  @ApiOkResponse({
    type: WithdrawMoneyToPaypalAccountOkResponseDto,
  })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBody({ type: WithdrawMoneyToPaypalAccountDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(DriverJwtAuthGuard)
  @Post('/:driverId/withdraw-money-to-paypal-account')
  async withdrawMoneyToPaypalAccount(
    @Request() req,
    @Param() params,
    @Body()
    withdrawMoneyToPaypalAccountDto: WithdrawMoneyToPaypalAccountDto,
  ): Promise<WithdrawMoneyToPaypalAccountOkResponseDto> {
    const { driverId } = params;
    console.log('Req.user', req.user.userId);
    return this.driverService.withdrawMoneyToPaypalAccount(
      withdrawMoneyToPaypalAccountDto,
      driverId,
      req.user.userId,
    );
  }
}
