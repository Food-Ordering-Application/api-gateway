import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { AuthService } from 'src/auth/auth.service';
import { InternalServerErrorResponseDto } from 'src/shared/dto/internal-server-error.dto';
import { DriverService } from './driver.service';

@ApiTags('driver')
@ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto })
@Controller('user/driver')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @HttpCode(200)
  @Post('/order/:orderId/accept')
  async acceptOrder(@Param('orderId') orderId: string) {
    const MOCK_DRIVER_ID = 'a22f3f78-be7f-11eb-8529-0242ac130003';
    const driverId = MOCK_DRIVER_ID;
    return await this.driverService.acceptOrder(driverId, orderId);
  }
}
