import {
  Controller,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { AuthService } from '../../auth/auth.service';
import { DriverLocalAuthGuard } from '../../auth/guards/locals/driver-local-auth.guard';
import { DriverService } from './driver.service';
import {
  LoginDriverDto,
  LoginDriverResponseDto,
  LoginDriverUnauthorizedResponseDto,
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
}
