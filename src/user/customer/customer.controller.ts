import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Request,
  HttpCode,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateCustomerConflictResponseDto,
  CreateCustomerResponseDto,
  CreateCustomerDto,
  LoginCustomerDto,
  LoginCustomerResponseDto,
  LoginCustomerUnauthorizedResponseDto,
  SendPhoneNumberOTPVerifyResponseDto,
  VerifyCustomerPhoneNumberDto,
  VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  VerifyCustomerPhoneNumberResponseDto,
  FindCustomerByIdResponseDto,
  CreateCustomerAddressResponseDto,
  CreateCustomerAddressDto,
  ForbiddenResponseDto,
  UpdateCustomerAddressResponseDto,
  UpdateCustomerAddressDto,
  DeleteCustomerAddressResponseDto,
  GetListCustomerAddressResponseDto,
  SendResetPasswordEmailDto,
  SendResetPasswordEmailResponseDto,
  GetCustomerResetPasswordTokenResponse,
  UpdateCustomerPasswordResponseDto,
  UpdateCustomerPasswordDto,
  UpdateCustomerInfoResponseDto,
  UpdateCustomerInfoDto,
  SendPhoneNumberOtpVerifyDto,
  VerifyCustomerEmailResponseDto,
} from './dto/index';
import { CustomerService } from './customer.service';
import { LocalAuthGuard } from '../../auth/guards/locals/local-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { CustomerJwtAuthGuard } from '../../auth/guards/jwts/jwt-auth.guard';
import { InternalServerErrorResponseDto } from '../../shared/dto/internal-server-error.dto';
import { PoliciesGuard } from '../../casl/guards/policy.guard';
import { CheckPolicies } from '../../casl/decorators/check-policy.decorator';
import { AppAbility } from '../../casl/casl-ability.factory';
import { Action } from '../../shared/enum/actions.enum';
import { Customer } from '../../shared/classes';
@ApiTags('customer')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/customer')
export class CustomerController {
  private logger = new Logger('CustomerController');

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
  ) {}

  // Đăng ký Customer
  @ApiCreatedResponse({ type: CreateCustomerResponseDto })
  @ApiConflictResponse({ type: CreateCustomerConflictResponseDto })
  @ApiBody({ type: CreateCustomerDto })
  @Post()
  async registerCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  // Đăng nhập Customer
  @ApiOkResponse({ type: LoginCustomerResponseDto })
  @ApiUnauthorizedResponse({ type: LoginCustomerUnauthorizedResponseDto })
  @ApiBody({ type: LoginCustomerDto })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginCustomer(@Request() req): Promise<LoginCustomerResponseDto> {
    return this.authService.login(req.user);
  }

  // Gửi mã OTP
  @ApiOkResponse({ type: SendPhoneNumberOTPVerifyResponseDto })
  @ApiBody({ type: SendPhoneNumberOtpVerifyDto })
  @HttpCode(200)
  @Post('/send-otp')
  async sendOTPVerify(
    @Body() sendPhoneNumberOtpVerifyDto: SendPhoneNumberOtpVerifyDto,
  ): Promise<SendPhoneNumberOTPVerifyResponseDto> {
    return this.customerService.sendPhoneNumberOTPVerify(
      sendPhoneNumberOtpVerifyDto,
    );
  }

  // Verified OTP
  @ApiOkResponse({ type: VerifyCustomerPhoneNumberResponseDto })
  @ApiUnauthorizedResponse({
    type: VerifyCustomerPhoneNumberUnauthorizedResponseDto,
  })
  @ApiBody({ type: VerifyCustomerPhoneNumberDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Post('/verify-otp')
  async verifyCustomerPhoneNumber(
    @Request() req,
    @Body() verifyOtpDto: VerifyCustomerPhoneNumberDto,
  ): Promise<VerifyCustomerPhoneNumberResponseDto> {
    this.logger.log(req.user);
    return this.customerService.verifyCustomerPhoneNumber(
      req.user,
      verifyOtpDto.otp,
    );
  }

  // Fetch customer data
  @ApiOkResponse({ type: FindCustomerByIdResponseDto })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto })
  @ApiBearerAuth()
  @ApiParam({
    name: 'customerId',
    type: 'String',
    required: true,
  })
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Get('/:customerId')
  async findCustomerById(
    @Request() req,
    @Param() params,
  ): Promise<FindCustomerByIdResponseDto> {
    // Nếu không phải chính user đó
    if (req.user.userId !== params.customerId) {
      return {
        statusCode: 403,
        message: 'Forbidden',
        data: null,
      };
    }
    return this.customerService.findCustomerById(params.customerId);
  }

  // Tạo địa chỉ customer
  @ApiOkResponse({ type: CreateCustomerAddressResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'customerId',
    type: 'string',
    required: true,
  })
  @ApiBody({ type: CreateCustomerAddressDto })
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Post('/:customerId/address')
  async createCustomerAddress(
    @Request() req,
    @Param() params,
    @Body()
    createCustomerAddressDto: CreateCustomerAddressDto,
  ): Promise<CreateCustomerAddressResponseDto> {
    // Nếu không phải chính user đó
    if (req.user.userId !== params.customerId) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    const { customerId } = params;
    return this.customerService.createCustomerAddress(
      customerId,
      createCustomerAddressDto,
    );
  }

  // Update địa chỉ customer
  @ApiOkResponse({ type: UpdateCustomerAddressResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateCustomerAddressDto })
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Patch('/:customerId/address/:customerAddressId')
  async updateCustomerAddress(
    @Request() req,
    @Param() params,
    @Body()
    updateCustomerAddressDto: UpdateCustomerAddressDto,
  ): Promise<UpdateCustomerAddressResponseDto> {
    const { customerId, customerAddressId } = params;
    // Nếu không phải chính user đó
    if (req.user.userId !== customerId) {
      return {
        statusCode: 403,
        message: 'Forbidden',
        data: null,
      };
    }

    return this.customerService.updateCustomerAddress(
      customerId,
      customerAddressId,
      updateCustomerAddressDto,
    );
  }

  // Xóa địa chỉ customer
  @ApiOkResponse({ type: DeleteCustomerAddressResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Delete('/:customerId/address/:customerAddressId')
  async deleteCustomerAddress(
    @Request() req,
    @Param() params,
  ): Promise<DeleteCustomerAddressResponseDto> {
    const { customerId, customerAddressId } = params;
    // Nếu không phải chính user đó
    if (req.user.userId !== customerId) {
      return {
        statusCode: 403,
        message: 'Forbidden',
      };
    }

    return this.customerService.deleteCustomerAddress(
      customerId,
      customerAddressId,
    );
  }

  // List địa chỉ customer
  @ApiOkResponse({ type: GetListCustomerAddressResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Get('/:customerId/address')
  async getListCustomerAddress(
    @Request() req,
    @Param() params,
  ): Promise<GetListCustomerAddressResponseDto> {
    const { customerId } = params;
    // Nếu không phải chính user đó
    if (req.user.userId !== customerId) {
      return {
        statusCode: 403,
        message: 'Forbidden',
        data: null,
      };
    }

    return this.customerService.getListCustomerAddress(customerId);
  }

  //! Gửi email đặt lại mật khẩu
  @ApiOkResponse({ type: SendResetPasswordEmailResponseDto })
  @ApiBody({ type: SendResetPasswordEmailDto })
  @HttpCode(200)
  @Post('/reset-password')
  async sendResetPasswordEmail(
    @Body()
    sendPasswordResetEmailDto: SendResetPasswordEmailDto,
  ): Promise<SendResetPasswordEmailResponseDto> {
    return this.customerService.sendResetPasswordEmail(
      sendPasswordResetEmailDto,
    );
  }

  //! Lấy thông tin customer dựa trên resetPasswordToken
  @ApiOkResponse({ type: GetCustomerResetPasswordTokenResponse })
  @Get('/reset-password/:resetToken')
  async getCustomerResetPasswordToken(
    @Param() params,
  ): Promise<GetCustomerResetPasswordTokenResponse> {
    const { resetToken } = params;
    return this.customerService.getCustomerResetPasswordToken(resetToken);
  }

  //! Cập nhật lại mật khẩu
  @ApiOkResponse({ type: UpdateCustomerPasswordResponseDto })
  @ApiBody({ type: UpdateCustomerPasswordDto })
  @Patch('/new-password')
  async updateCustomerPassword(
    @Body()
    updateCustomerPasswordDto: UpdateCustomerPasswordDto,
  ): Promise<UpdateCustomerPasswordResponseDto> {
    console.log('Hello there');
    console.log(updateCustomerPasswordDto);
    return this.customerService.updateCustomerPassword(
      updateCustomerPasswordDto,
    );
  }

  //! Cập nhật thông tin customer
  @ApiOkResponse({ type: UpdateCustomerInfoResponseDto })
  @ApiForbiddenResponse({
    type: ForbiddenResponseDto,
  })
  @ApiBody({ type: UpdateCustomerInfoDto })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Customer))
  @Patch('/:customerId/update-info')
  async updateCustomerInfo(
    @Request() req,
    @Param() params,
    @Body()
    updateCustomerInfoDto: UpdateCustomerInfoDto,
  ): Promise<UpdateCustomerInfoResponseDto> {
    const { customerId } = params;
    // Nếu không phải chính user đó
    if (req.user.userId !== customerId) {
      return {
        statusCode: 403,
        message: 'Forbidden',
        data: null,
      };
    }
    return this.customerService.updateCustomerInfo(
      updateCustomerInfoDto,
      customerId,
    );
  }

  //! Lấy thông tin customer dựa trên resetPasswordToken
  @ApiOkResponse({ type: VerifyCustomerEmailResponseDto })
  @Get('/verify-email/:verifyEmailToken')
  async verifyCustomerEmail(
    @Param() params,
  ): Promise<VerifyCustomerEmailResponseDto> {
    const { verifyEmailToken } = params;
    return this.customerService.verifyCustomerEmail(verifyEmailToken);
  }

  //! Event payment order
  @Post('/event/order')
  async eventPaypalOrderOccur(
    @Body()
    eventPaypalOrderOccurDto,
  ) {
    console.log('Body', eventPaypalOrderOccurDto);
  }
}
