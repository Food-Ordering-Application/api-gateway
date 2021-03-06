import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AnyJwtAuthGuard } from 'src/auth/guards/jwts/any-jwt-auth.guard';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { AuthService } from '../../auth/auth.service';
import { DriverJwtAuthGuard } from '../../auth/guards/jwts/driver-jwt-auth.guard';
import { DriverLocalAuthGuard } from '../../auth/guards/locals/driver-local-auth.guard';
import { EventPaypalOrderOccurDto } from '../../order/dto';
import { ForbiddenResponseDto } from '../customer/dto';
import { DriverService } from './driver.service';
import {
  ApproveDepositMoneyIntoMainAccountWalletDto,
  ApproveDepositMoneyIntoMainAccountWalletOkResponseDto,
  DepositMoneyIntoMainAccountWalletDto,
  DepositMoneyIntoMainAccountWalletOkResponseDto,
  GetDriverActiveStatusResponseDto,
  GetDriverDailyStatisticOkResponse,
  GetDriverMonthlyStatisticOkResponseDto,
  GetDriverWeeklyStatisticOkResponseDto,
  GetLatestDriverLocationResponseDto,
  GetListAccountTransactionDriverDto,
  GetListAccountTransactionDriverOkResponseDto,
  GetListDriverTransactionHistoryDto,
  GetMainAccountWalletBalanceOkResponseDto,
  LoginDriverDto,
  LoginDriverResponseDto,
  LoginDriverUnauthorizedResponseDto,
  RegisterDriverConflictResponseDto,
  RegisterDriverCreatedResponseDto,
  RegisterDriverDto,
  UpdateIsActiveOfDriverDto,
  UpdateIsActiveOfDriverOkResponseDto,
  UpdateLocationDto,
  WithdrawMoneyToPaypalAccountDto,
  WithdrawMoneyToPaypalAccountForbiddenResponse1Dto,
  WithdrawMoneyToPaypalAccountForbiddenResponse2Dto,
  WithdrawMoneyToPaypalAccountInternalResponse1Dto,
  WithdrawMoneyToPaypalAccountInternalResponse2Dto,
  WithdrawMoneyToPaypalAccountOkResponseDto,
} from './dto';
import { GetDriverInformationOkResponseDto } from './dto/get-driver-information/get-driver-information-ok-response.dto';
import { GetListDriverTransactionHistoryOkResponseDto } from './dto/payin-withdraw/get-list-transaction-history-ok-response.dto';

@ApiTags('driver')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
    private authService: AuthService,
  ) {}

  //! S??? ki???n n???p, r??t ti???n driver
  @Post('/events/receive')
  async eventPaypalOrderOccur(
    @Body()
    eventPaypalOrderOccurDto: EventPaypalOrderOccurDto,
  ) {
    console.log('eventPaypalOrderOccurDto', eventPaypalOrderOccurDto);
    this.driverService.eventPaypalOrderOccur(eventPaypalOrderOccurDto);
  }

  @UseGuards(DriverJwtAuthGuard)
  @HttpCode(200)
  @Post('/order/:orderId/accept')
  async acceptOrder(@Param('orderId') orderId: string, @Request() req) {
    const driverId = req.user.userId;
    return await this.driverService.acceptOrder(driverId, orderId);
  }

  @UseGuards(DriverJwtAuthGuard)
  @HttpCode(200)
  @Post('/order/:orderId/decline')
  async declineOrder(@Param('orderId') orderId: string, @Request() req) {
    const driverId = req.user.userId;
    return await this.driverService.declineOrder(driverId, orderId);
  }

  @UseGuards(DriverJwtAuthGuard)
  @HttpCode(200)
  @Post('/order/:orderId/pickup')
  async pickUpOrder(@Param('orderId') orderId: string, @Request() req) {
    const driverId = req.user.userId;
    return await this.driverService.pickUpOrder(driverId, orderId);
  }

  @UseGuards(DriverJwtAuthGuard)
  @HttpCode(200)
  @Post('/order/:orderId/complete')
  async completeOrder(@Param('orderId') orderId: string, @Request() req) {
    const driverId = req.user.userId;
    return await this.driverService.completeOrder(driverId, orderId);
  }

  //! ????ng nh????p driver
  @ApiOkResponse({ type: LoginDriverResponseDto })
  @ApiUnauthorizedResponse({ type: LoginDriverUnauthorizedResponseDto })
  @ApiBody({ type: LoginDriverDto })
  @UseGuards(DriverLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginDriver(@Request() req): Promise<LoginDriverResponseDto> {
    return this.authService.driverLogin(req.user);
  }

  //! ????ng ky?? driver
  @ApiCreatedResponse({ type: RegisterDriverCreatedResponseDto })
  @ApiConflictResponse({ type: RegisterDriverConflictResponseDto })
  @ApiBody({ type: RegisterDriverDto })
  @Post()
  async registerDriver(
    @Body() registerDriverDto: RegisterDriverDto,
  ): Promise<RegisterDriverCreatedResponseDto> {
    return this.driverService.registerDriver(registerDriverDto);
  }

  //! CreateOrder Na??p ti????n va??o ta??i khoa??n chi??nh driver
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

  //! ApproveOrder Na??p ti????n va??o ta??i khoa??n chi??nh driver
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

  //! Ru??t ti????n t???? vi?? va??o ta??i khoa??n paypal cu??a driver
  @ApiOkResponse({
    type: WithdrawMoneyToPaypalAccountOkResponseDto,
  })
  @ApiResponse({
    status: 4031,
    type: WithdrawMoneyToPaypalAccountForbiddenResponse1Dto,
  })
  @ApiResponse({
    status: 4032,
    type: WithdrawMoneyToPaypalAccountForbiddenResponse2Dto,
  })
  @ApiResponse({
    status: 500,
    type: WithdrawMoneyToPaypalAccountInternalResponse1Dto,
  })
  @ApiResponse({
    status: 5002,
    type: WithdrawMoneyToPaypalAccountInternalResponse2Dto,
  })
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

  //! L???y danh s??ch l???ch s??? giao d???ch (n???p,r??t) ti???n c???a driver
  @ApiOkResponse({ type: GetListDriverTransactionHistoryOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiQuery({ type: GetListDriverTransactionHistoryDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/transaction-histories')
  async getListDriverTransactionHistory(
    @Request() req,
    @Param() params,
    @Query()
    getListDriverTransactionHistoryDto: GetListDriverTransactionHistoryDto,
  ): Promise<GetListDriverTransactionHistoryOkResponseDto> {
    const { driverId } = params;
    return this.driverService.getListDriverTransactionHistory(
      driverId,
      req.user.userId,
      getListDriverTransactionHistoryDto,
    );
  }

  //! L???y danh s??ch l???ch s??? giao d???ch tr??? c???ng ti???n h??? th???ng c???a driver
  @ApiOkResponse({ type: GetListAccountTransactionDriverOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiQuery({ type: GetListAccountTransactionDriverDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/account-transactions')
  async getListAccountTransactionDriver(
    @Request() req,
    @Param() params,
    @Query()
    getListAccountTransactionDriverDto: GetListAccountTransactionDriverDto,
  ): Promise<GetListAccountTransactionDriverOkResponseDto> {
    const { driverId } = params;
    return this.driverService.getListAccountTransactionDriver(
      driverId,
      req.user.userId,
      getListAccountTransactionDriverDto,
    );
  }

  //! L???y th??ng tin balance c???a t??i kho???n ch??nh
  @ApiOkResponse({ type: GetMainAccountWalletBalanceOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/account-wallet')
  async getMainAccountWalletBalance(
    @Request() req,
    @Param() params,
  ): Promise<GetMainAccountWalletBalanceOkResponseDto> {
    const { driverId } = params;
    return this.driverService.getMainAccountWalletBalance(
      driverId,
      req.user.userId,
    );
  }

  //! Update th??ng tin isActive c???a driver
  @ApiOkResponse({ type: UpdateIsActiveOfDriverOkResponseDto })
  @ApiBody({ type: UpdateIsActiveOfDriverDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Put('active')
  async updateIsActiveOfDriver(
    @Request() req,
    @Body()
    updateIsActiveOfDriverDto: UpdateIsActiveOfDriverDto,
  ): Promise<UpdateIsActiveOfDriverOkResponseDto> {
    return this.driverService.updateIsActiveOfDriver(
      req.user.userId,
      updateIsActiveOfDriverDto,
    );
  }

  @ApiOkResponse({ type: GetDriverActiveStatusResponseDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('active')
  async getDriverActiveStatus(
    @Request() req,
  ): Promise<GetDriverActiveStatusResponseDto> {
    return this.driverService.getDriverActiveStatus(req.user.userId);
  }

  @ApiBody({ type: UpdateLocationDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Put('location')
  async updateDriverLocation(
    @Request() req,
    @Body()
    updateLocationDto: UpdateLocationDto,
  ) {
    return this.driverService.updateDriverLocation(
      req.user.userId,
      updateLocationDto,
    );
  }
  //! Api th???ng k?? theo ng??y
  @ApiOkResponse({ type: GetDriverDailyStatisticOkResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/today-statistic')
  async getDriverDailyStatistic(
    @Request() req,
    @Param() params,
  ): Promise<GetDriverDailyStatisticOkResponse> {
    const { driverId } = params;
    return this.driverService.getDriverDailyStatistic(
      driverId,
      req.user.userId,
    );
  }

  //! Api th???ng k?? theo tu???n
  @ApiOkResponse({ type: GetDriverWeeklyStatisticOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/weekly-statistic')
  async getDriverWeeklyStatistic(
    @Request() req,
    @Param() params,
  ): Promise<GetDriverWeeklyStatisticOkResponseDto> {
    const { driverId } = params;
    return this.driverService.getDriverWeeklyStatistic(
      driverId,
      req.user.userId,
    );
  }

  //! Api th???ng k?? theo th??ng
  @ApiOkResponse({ type: GetDriverMonthlyStatisticOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/monthly-statistic')
  async getDriverMonthlyStatistic(
    @Request() req,
    @Param() params,
  ): Promise<GetDriverMonthlyStatisticOkResponseDto> {
    const { driverId } = params;
    return this.driverService.getDriverMonthlyStatistic(
      driverId,
      req.user.userId,
    );
  }

  //! Test locking route 1
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/test-update-accountwallet')
  async testUpdateAccountWallet(@Request() req, @Param() params) {
    const { driverId } = params;
    return this.driverService.testUpdateAccountWallet(
      driverId,
      req.user.userId,
    );
  }
  //! Test locking route 2
  @UseGuards(DriverJwtAuthGuard)
  @Get('/:driverId/test-get-accountwallet')
  async testGetAccountWallet(@Request() req, @Param() params) {
    const { driverId } = params;
    return this.driverService.testGetAccountWallet(driverId, req.user.userId);
  }

  @ApiOkResponse({ type: GetLatestDriverLocationResponseDto })
  @ApiBearerAuth()
  @UseGuards(AnyJwtAuthGuard)
  @Get('/:driverId/location')
  async getLatestLocationOfDriver(
    @Request() req,
    @Param() params,
  ): Promise<GetLatestDriverLocationResponseDto> {
    const { driverId } = params;
    return this.driverService.getLatestLocationOfDriver(driverId);
  }

  //! L????y s??t, t??n, a??nh khu??n m????t, bi????n s???? cu??a driver
  @ApiOkResponse({ type: GetDriverInformationOkResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @UseGuards(AnyJwtAuthGuard)
  @Get('/:driverId/driver-info')
  async getDriverInformation(
    @Request() req,
    @Param() params,
  ): Promise<GetDriverInformationOkResponseDto> {
    const { driverId } = params;
    // if (driverId.toString() !== req.user.userId) {
    //   return {
    //     statusCode: HttpStatus.FORBIDDEN,
    //     message: 'Forbidden',
    //     data: null,
    //   };
    // }

    return this.driverService.getDriverInformation(driverId);
  }
}
