import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { MerchantJwtRequest } from 'src/auth/strategies/jwt-strategies/merchant-jwt-request.interface';
import { PosJwtAuthGuard } from '../../auth/guards/jwts/pos-jwt-auth.guard';
import { InternalServerErrorResponseDto } from '../../shared/dto/internal-server-error.dto';
import { ForbiddenResponseDto } from '../customer/dto';
import {
  CreateMerchantConflictResponseDto,
  CreateMerchantDto,
  CreateMerchantResponseDto,
  FindMerchantByIdResponseDto,
  FindMerchantByIdUnauthorizedResponseDto,
  LoginMerchantDto,
  LoginMerchantResponseDto,
  LoginMerchantUnauthorizedResponseDto,
} from '../merchant/dto/index';
import { MerchantJwtAuthGuard } from './../../auth/guards/jwts/merchant-jwt-auth.guard';
import { MerchantLocalAuthGuard } from './../../auth/guards/locals/merchant-local-auth.guard';
import { MerchantService } from './merchant.service';

@ApiTags('merchant')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/merchant')
export class MerchantController {
  private logger = new Logger('MerchantController');

  constructor(
    private merchantService: MerchantService,
    private authService: AuthService,
  ) {}

  // Đăng ký Merchant
  @ApiCreatedResponse({ type: CreateMerchantResponseDto })
  @ApiConflictResponse({ type: CreateMerchantConflictResponseDto })
  @ApiBody({ type: CreateMerchantDto })
  @Post()
  async registerMerchant(
    @Body() createMerchantDto: CreateMerchantDto,
  ): Promise<CreateMerchantResponseDto> {
    return await this.merchantService.createMerchant(createMerchantDto);
  }

  // Đăng nhập Merchant
  @ApiOkResponse({ type: LoginMerchantResponseDto })
  @ApiUnauthorizedResponse({ type: LoginMerchantUnauthorizedResponseDto })
  @ApiBody({ type: LoginMerchantDto })
  @ApiBearerAuth()
  @UseGuards(MerchantLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginMerchant(@Request() req): Promise<LoginMerchantResponseDto> {
    return await this.authService.merchantLogin(req.user);
  }

  // Fetch merchant data
  @ApiOkResponse({ type: FindMerchantByIdResponseDto })
  @ApiUnauthorizedResponse({ type: FindMerchantByIdUnauthorizedResponseDto })
  @ApiParam({
    name: 'merchantId',
    type: 'String',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(MerchantJwtAuthGuard)
  @Get('/:merchantId')
  async findMerchantById(
    @Request() req: MerchantJwtRequest,
    @Param('merchantId') merchantId,
  ): Promise<FindMerchantByIdResponseDto> {
    // Nếu không phải chính user đó
    if (req.user.merchantId !== merchantId) {
      return {
        statusCode: 403,
        message: 'Unauthorized',
        data: null,
      };
    }
    return await this.merchantService.findMerchantById(merchantId);
  }
}
