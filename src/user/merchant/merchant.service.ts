import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../constants';
import {
  CreateMerchantDto,
  CreateMerchantResponseDto,
  FindMerchantByIdResponseDto,
  UpdateIsAutoConfirmOrderDto,
  UpdateIsAutoConfirmOrderOkResponseDto,
} from '../merchant/dto/index';
import {
  IIsAutoConfirmResponse,
  IMerchant,
  IUserServiceCreateMerchantResponse,
  IUserServiceFetchMerchantResponse,
} from '../merchant/interfaces/index';

@Injectable()
export class MerchantService {
  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  async createMerchant(
    createMerchantDto: CreateMerchantDto,
  ): Promise<CreateMerchantResponseDto> {
    const createMerchantResponse: IUserServiceCreateMerchantResponse = await this.userServiceClient
      .send('createMerchant', createMerchantDto)
      .toPromise();

    const { status, message, user } = createMerchantResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 201,
      message,
      data: {
        user,
      },
    };
  }

  async getAuthenticatedMerchant(
    username: string,
    password: string,
  ): Promise<IMerchant> {
    const authenticatedMerchantResponse: IUserServiceFetchMerchantResponse = await this.userServiceClient
      .send('getAuthenticatedMerchant', { username, password })
      .toPromise();
    const { message, user, status } = authenticatedMerchantResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return user;
  }

  async findMerchantById(
    merchantId: string,
  ): Promise<FindMerchantByIdResponseDto> {
    const findMerchantById: IUserServiceFetchMerchantResponse = await this.userServiceClient
      .send('findMerchantById', merchantId)
      .toPromise();

    const { status, message, user } = findMerchantById;

    if (findMerchantById.status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
      data: {
        user,
      },
    };
  }

  //! Update thông tin isAutoConfirm của merchant
  async updateIsAutoConfirmOrder(
    merchantId: string,
    callerId: string,
    updateIsAutoConfirmOrderDto: UpdateIsAutoConfirmOrderDto,
  ): Promise<UpdateIsAutoConfirmOrderOkResponseDto> {
    //TODO:
    const updateIsAutoConfirmOrderResponse: IIsAutoConfirmResponse = await this.userServiceClient
      .send('updateIsAutoConfirmOrder', {
        merchantId,
        callerId,
        ...updateIsAutoConfirmOrderDto,
      })
      .toPromise();

    const { message, status, isAutoConfirm } = updateIsAutoConfirmOrderResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: message,
        },
        status,
      );
    }

    return {
      statusCode: status,
      message,
      data: {
        isAutoConfirm: isAutoConfirm,
      },
    };
  }
}
