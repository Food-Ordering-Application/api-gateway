import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { AuthService } from 'src/auth/auth.service';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { AdminJwtAuthGuard } from './../../auth/guards/jwts/admin-jwt-auth.guard';
import { AdminLocalAuthGuard } from './../../auth/guards/locals/admin-local-auth.guard';
import { AdminService } from './admin.service';
import {
  FetchRestaurantDto,
  FetchRestaurantProfilesResponseDto,
  FetchRestaurantProfilesUnauthorizedResponseDto,
  GeneratePosKeyDto,
  GeneratePosKeyResponseDto,
  LoginAdminDto,
  LoginAdminResponseDto,
  LoginAdminUnauthorizedResponseDto,
  VerifyRestaurantDto,
  VerifyRestaurantResponseDto,
  VerifyRestaurantUnauthorizedResponseDto,
} from './dto';

@ApiTags('admin')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  // Đăng nhập Admin
  @ApiOkResponse({ type: LoginAdminResponseDto })
  @ApiUnauthorizedResponse({ type: LoginAdminUnauthorizedResponseDto })
  @ApiBody({ type: LoginAdminDto })
  @ApiBearerAuth()
  @UseGuards(AdminLocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async loginAdmin(@Request() req): Promise<LoginAdminResponseDto> {
    return this.authService.adminLogin(req.user);
  }

  @ApiOkResponse({ type: VerifyRestaurantResponseDto })
  @ApiUnauthorizedResponse({
    type: VerifyRestaurantUnauthorizedResponseDto,
  })
  @ApiBody({ type: VerifyRestaurantDto })
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @HttpCode(200)
  @Post('/verify-restaurant')
  async verifyRestaurant(@Body() verifyRestaurantDto: VerifyRestaurantDto) {
    return await this.adminService.verifyRestaurant(verifyRestaurantDto);
  }

  @ApiOkResponse({ type: GeneratePosKeyResponseDto })
  @ApiBody({ type: GeneratePosKeyDto })
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @HttpCode(200)
  @Post('/generate-pos-key')
  async generatePosAppKey(@Body() generatePosKeyDto: GeneratePosKeyDto) {
    return await this.adminService.generatePosAppKey(generatePosKeyDto);
  }

  @ApiOkResponse({ type: FetchRestaurantProfilesResponseDto })
  @ApiUnauthorizedResponse({
    type: FetchRestaurantProfilesUnauthorizedResponseDto,
  })
  @ApiQuery({ type: FetchRestaurantDto, required: false })
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @Get('/restaurant')
  async fetchRestaurantProfiles(
    @Query() fetchRestaurantProfilesDto: FetchRestaurantDto,
  ): Promise<FetchRestaurantProfilesResponseDto> {
    return await this.adminService.fetchRestaurantProfiles(
      fetchRestaurantProfilesDto,
    );
  }
}
