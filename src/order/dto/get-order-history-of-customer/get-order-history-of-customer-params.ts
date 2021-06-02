import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { OrderHistoryFilter } from 'src/order/enums';
import { PaginationParams } from '../../../shared/types/pagination-params';
export class GetOrderHistoryOfCustomerParams extends PaginationParams {}
