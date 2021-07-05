import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as PDFDocument from 'pdfkit';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import * as constants from '../constants';
import { ISimpleResponse } from '../shared/interfaces/simple-response.interface';
import { ICustomerAddressResponse } from '../user/customer/interfaces';
import {
  AddNewItemToOrderDto,
  AddNewItemToOrderResponseDto,
  ApprovePaypalOrderDto,
  ApprovePaypalOrderResponseDto,
  ConfirmOrderCheckoutDto,
  ConfirmOrderCheckoutResponseDto,
  CreateOrderDto,
  CreateOrderResponseDto,
  EventPaymentZALOPAYDto,
  EventPaypalOrderOccurDto,
  GetAllRestaurantOrderDto,
  GetAllRestaurantOrderResponseDto,
  GetDraftOrdersOfCustomerDto,
  GetDraftOrdersOfCustomerResponseDto,
  GetLastDraftOrderOfCustomerDto,
  GetListOrderOfDriverDto,
  GetListOrderOfDriverResponseDto,
  GetOngoingOrdersOfCustomerDto,
  GetOngoingOrdersOfCustomerResponseDto,
  GetOrderAssociatedWithCusAndResDto,
  GetOrderAssociatedWithCusAndResResponseDto,
  GetOrderDetailResponseDto,
  GetOrderHistoryOfCustomerPayload,
  GetOrderHistoryOfCustomerResponseDto,
  IncreaseOrderItemQuantityDto,
  IncreaseOrderItemQuantityResponseDto,
  PickCustomerAddressResponseDto,
  RateDriverDto,
  ReduceOrderItemQuantityDto,
  ReduceOrderItemQuantityResponseDto,
  RemoveOrderItemDto,
  RemoveOrderItemResponseDto,
  UpdateOrderItemQuantityDto,
  UpdateOrderItemQuantityResponseDto,
  UpdateZALOPAYPaymentStatusResponseDto,
} from './dto';
import { RateRestaurantDto } from './dto/rate-restaurant/rate-restaurant.dto';
import { transformOrderItem } from './helpers/helpers';
import {
  IConfirmOrderCheckoutResponse,
  ICreateOrderResponse,
  IGetMenuItemInfoResponse,
  IGetOrderActorInfoResponse,
  IOrdersResponse,
  IRatingResponse,
} from './interfaces';
import { CreateOrderPayload } from './interfaces/create-order-payload.interface';
@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.ORDER_SERVICE)
    private orderServiceClient: ClientProxy,
    @Inject(constants.USER_SERVICE)
    private userServiceClient: ClientProxy,
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async createOrderAndFirstOrderItem(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    console.log('createOrder');

    // Lấy thông tin nhà hàng
    // Thông tin địa chỉ customer (neu la sale channel)
    // Name và price của menuItem
    // Name và price của từng menuItemTopping
    const { restaurantId, customerId, orderItem, cashierId } = createOrderDto;
    const isSaleChannelOrder = !!customerId;

    try {
      const [
        getCustomerInfoResponse,
        getRestaurantInfoResponse,
        getMenuItemInfoResponse,
      ]: [
        IGetOrderActorInfoResponse,
        IGetOrderActorInfoResponse,
        IGetMenuItemInfoResponse,
      ] = await Promise.all([
        isSaleChannelOrder
          ? this.userServiceClient
              .send('getCustomerInformationToCreateDelivery', { customerId })
              .pipe(
                timeout(5000),
                catchError((err) => {
                  if (err instanceof TimeoutError) {
                    return throwError(
                      new RequestTimeoutException(
                        'Timeout. User server has problem!',
                      ),
                    );
                  }
                  return throwError({ message: err });
                }),
              )
              .toPromise()
          : null,
        this.restaurantServiceClient
          .send('getRestaurantInformationToCreateDelivery', {
            restaurantId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Restaurant server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise(),
        this.restaurantServiceClient
          .send('getMenuItemInfo', {
            orderItem,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Restaurant server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise(),
      ]);

      // catch error response
      const responses: (
        | (IGetOrderActorInfoResponse & { label: string })
        | (IGetMenuItemInfoResponse & { label: string })
      )[] = [
        { ...getMenuItemInfoResponse, label: 'getMenuItemInfo' },
        { ...getRestaurantInfoResponse, label: 'getRestaurantInfo' },
        { ...getCustomerInfoResponse, label: 'getCustomerInfo' },
      ];
      const firstErrorResponse = responses
        .filter(
          (response) =>
            response != null &&
            response?.status &&
            response?.status !== HttpStatus.OK,
        )
        .find(({ status = HttpStatus.OK }) => status !== HttpStatus.OK);

      if (firstErrorResponse) {
        console.log(firstErrorResponse.label + ' fail');
        throw new HttpException(
          {
            message: firstErrorResponse.message,
          },
          firstErrorResponse.status,
        );
      }

      // create payload to create order
      let customerPayload = null;
      if (isSaleChannelOrder) {
        const {
          data: {
            address: customerAddress,
            geom: customerGeom,
            name: customerName,
            phoneNumber: customerPhoneNumber,
          },
        } = getCustomerInfoResponse;
        customerPayload = {
          customerId,
          customerName,
          customerPhoneNumber,
          customerAddress,
          customerGeom,
        };
      }
      const {
        data: {
          address: restaurantAddress,
          geom: restaurantGeom,
          name: restaurantName,
          phoneNumber: restaurantPhoneNumber,
        },
      } = getRestaurantInfoResponse;
      const restaurantPayload = {
        restaurantId,
        restaurantName,
        restaurantPhoneNumber,
        restaurantAddress,
        restaurantGeom,
      };

      const {
        data: { menuItemToppings, menuItem },
      } = getMenuItemInfoResponse;

      const tfOrderItem = transformOrderItem(
        menuItemToppings,
        menuItem,
        orderItem,
      );

      const createOrderPayload: CreateOrderPayload = {
        orderItem: tfOrderItem,
        customer: customerPayload,
        restaurant: restaurantPayload,
        cashierId,
      };
      // create order
      const createOrderAndFirstOrderItemResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('createOrderAndFirstOrderItem', createOrderPayload)
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();
      const { message, order, status } = createOrderAndFirstOrderItemResponse;

      if (status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getOrderAssociatedWithCusAndRes(
    getOrderAssociatedWithCusAndResDto: GetOrderAssociatedWithCusAndResDto,
  ): Promise<GetOrderAssociatedWithCusAndResResponseDto> {
    try {
      const getOrderAssociatedWithCusAndResResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send(
            'getOrderAssociatedWithCusAndRes',
            getOrderAssociatedWithCusAndResDto,
          )
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, order, status } =
        getOrderAssociatedWithCusAndResResponse;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async addNewItemToOrder(
    addNewItemToOrderDto: AddNewItemToOrderDto,
    orderId: string,
  ): Promise<AddNewItemToOrderResponseDto> {
    try {
      //TODO: Lấy thông tin name và price của món được gửi lên + topping nếu có
      const getMenuItemInfoResponse: IGetMenuItemInfoResponse =
        await this.restaurantServiceClient
          .send('getMenuItemInfo', {
            orderItem: addNewItemToOrderDto.sendItem,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      if (getMenuItemInfoResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: getMenuItemInfoResponse.message,
          },
          getMenuItemInfoResponse.status,
        );
      }
      const { menuItemToppings, menuItem } = getMenuItemInfoResponse.data;

      const tfOrderItem = transformOrderItem(
        menuItemToppings,
        menuItem,
        addNewItemToOrderDto.sendItem,
      );

      //TODO: Thêm món đó vào order
      const addNewOrderItemToOrderDtoResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('addNewItemToOrder', {
            ...addNewItemToOrderDto,
            sendItem: tfOrderItem,
            orderId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, order, status } = addNewOrderItemToOrderDtoResponse;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async reduceOrderItemQuantity(
    reduceOrderItemQuantityDto: ReduceOrderItemQuantityDto,
    orderId: string,
  ): Promise<ReduceOrderItemQuantityResponseDto> {
    try {
      const reduceQuantityOrderItemResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('reduceOrderItemQuantity', {
            ...reduceOrderItemQuantityDto,
            orderId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();
      const { message, order, status } = reduceQuantityOrderItemResponse;
      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async increaseOrderItemQuantity(
    increaseOrderItemQuantityDto: IncreaseOrderItemQuantityDto,
    orderId: string,
  ): Promise<IncreaseOrderItemQuantityResponseDto> {
    try {
      const increaseOrderItemQuantityResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('increaseOrderItemQuantity', {
            ...increaseOrderItemQuantityDto,
            orderId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();
      const { message, order, status } = increaseOrderItemQuantityResponse;
      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async removeOrderItem(
    removeOrderItemDto: RemoveOrderItemDto,
    orderId: string,
  ): Promise<RemoveOrderItemResponseDto> {
    try {
      const removeOrderItemResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('removeOrderItem', { ...removeOrderItemDto, orderId })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, order, status } = removeOrderItemResponse;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getAllRestaurantOrder(
    getAllRestaurantOrderDto: GetAllRestaurantOrderDto,
  ): Promise<GetAllRestaurantOrderResponseDto> {
    try {
      const getAllRestaurantOrderResponse: IOrdersResponse =
        await this.orderServiceClient
          .send('getOrdersOfRestaurant', { ...getAllRestaurantOrderDto })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, orders, status } = getAllRestaurantOrderResponse;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          orders,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getOrderDetail(orderId: string): Promise<GetOrderDetailResponseDto> {
    try {
      const getAllRestaurantOrderResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('getOrderDetail', { orderId })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, order, status } = getAllRestaurantOrderResponse;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      doc.text('hello world', 100, 50);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  async updateOrderItemQuantity(
    updateOrderItemQuantityDto: UpdateOrderItemQuantityDto,
    orderId: string,
  ): Promise<UpdateOrderItemQuantityResponseDto> {
    try {
      const updateOrderItemQuantityResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('updateOrderItemQuantity', {
            ...updateOrderItemQuantityDto,
            orderId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();
      const { message, order, status } = updateOrderItemQuantityResponse;
      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }
      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async pickCustomerAddress(
    customerId: string,
    customerAddressId: string,
    orderId: string,
  ): Promise<PickCustomerAddressResponseDto> {
    try {
      //TODO: Update địa chỉ mặc định của customer
      const updateDefaultCustomerAddressResponse: ICustomerAddressResponse =
        await this.userServiceClient
          .send('updateDefaultCustomerAddress', {
            customerId,
            customerAddressId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();
      const { address } = updateDefaultCustomerAddressResponse;

      if (updateDefaultCustomerAddressResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: updateDefaultCustomerAddressResponse.message,
          },
          updateDefaultCustomerAddressResponse.status,
        );
      }
      //TODO: Update lại thông tin delivery. Tính toán lại shippingFee trả về thông tin order
      const updateDeliveryAddressResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('updateDeliveryAddress', {
            orderId,
            newAddress: {
              address: address.address,
              geom: address.geom,
            },
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();
      const { message, order, status } = updateDeliveryAddressResponse;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message,
          },
          status,
        );
      }

      return {
        statusCode: status,
        message,
        data: {
          order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async confirmOrderCheckout(
    confirmOrderCheckoutDto: ConfirmOrderCheckoutDto,
    orderId: string,
    customerId: string,
  ): Promise<ConfirmOrderCheckoutResponseDto> {
    try {
      //TODO:
      const confirmOrderCheckout: IConfirmOrderCheckoutResponse =
        await this.orderServiceClient
          .send('confirmOrderCheckout', {
            ...confirmOrderCheckoutDto,
            orderId,
            customerId,
          })
          .pipe(
            timeout(10000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, paypalOrderId, orderUrl } = confirmOrderCheckout;

      if (status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: message,
          },
          status,
        );
      }

      if (paypalOrderId) {
        return {
          statusCode: status,
          message,
          data: {
            paypalOrderId: paypalOrderId,
          },
        };
      } else if (orderUrl) {
        return {
          statusCode: status,
          message,
          data: {
            orderUrl: orderUrl,
          },
        };
      }
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async approvePaypalOrder(
    approvePaypalOrderDto: ApprovePaypalOrderDto,
    orderId: string,
    customerId: string,
  ): Promise<ApprovePaypalOrderResponseDto> {
    try {
      //TODO:
      const approvePaypalOrderResponse: ICreateOrderResponse =
        await this.orderServiceClient
          .send('approvePaypalOrder', {
            ...approvePaypalOrderDto,
            orderId,
            customerId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, order } = approvePaypalOrderResponse;

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
          order: order,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getListOrderOfDriver(
    driverId: string,
    callerId: string,
    getListOrderOfDriverDto: GetListOrderOfDriverDto,
  ): Promise<GetListOrderOfDriverResponseDto> {
    try {
      const getListOrderOfDriverResponse: IOrdersResponse =
        await this.orderServiceClient
          .send('getListOrderOfDriver', {
            driverId,
            callerId,
            ...getListOrderOfDriverDto,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, orders } = getListOrderOfDriverResponse;

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
          orders: orders,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getOngoingOrdersOfCustomer(
    getOngoingOrdersOfCustomerDto: GetOngoingOrdersOfCustomerDto,
  ): Promise<GetOngoingOrdersOfCustomerResponseDto> {
    try {
      const getOngoingOrdersOfCustomer: IOrdersResponse =
        await this.orderServiceClient
          .send('getOnGoingOrdersOfCustomer', {
            ...getOngoingOrdersOfCustomerDto,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, orders } = getOngoingOrdersOfCustomer;

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
          orders: orders,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getDraftOrdersOfCustomer(
    getDraftOrdersOfCustomerDto: GetDraftOrdersOfCustomerDto,
  ): Promise<GetDraftOrdersOfCustomerResponseDto> {
    try {
      const getDraftOrdersOfCustomer: IOrdersResponse =
        await this.orderServiceClient
          .send('getDraftOrdersOfCustomer', {
            ...getDraftOrdersOfCustomerDto,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, orders } = getDraftOrdersOfCustomer;

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
          orders: orders,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getLastDraftOrderOfCustomer(
    getLastDraftOrderOfCustomerDto: GetLastDraftOrderOfCustomerDto,
  ): Promise<GetDraftOrdersOfCustomerResponseDto> {
    try {
      const getLastDraftOrderOfCustomer: IOrdersResponse =
        await this.orderServiceClient
          .send('getLastDraftOrderOfCustomer', {
            ...getLastDraftOrderOfCustomerDto,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, orders } = getLastDraftOrderOfCustomer;

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
          orders: orders,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async getOrderHistoryOfCustomer(
    getOrderHistoryOfCustomerDto: GetOrderHistoryOfCustomerPayload,
  ): Promise<GetOrderHistoryOfCustomerResponseDto> {
    try {
      const getOrderHistoryOfCustomer: IOrdersResponse =
        await this.orderServiceClient
          .send('getOrderHistoryOfCustomer', {
            ...getOrderHistoryOfCustomerDto,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status, orders } = getOrderHistoryOfCustomer;

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
          orders: orders,
        },
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }

  async eventPaypalOrderOccur(
    eventPaypalOrderOccurDto: EventPaypalOrderOccurDto,
  ) {
    this.orderServiceClient.emit('eventPaypalOrderOccur', {
      ...eventPaypalOrderOccurDto,
    });
  }

  async rateRestaurant(
    customerId: string,
    orderId: string,
    rateRestaurantDto: RateRestaurantDto,
  ) {
    try {
      const rateRestaurantResponse: IRatingResponse =
        await this.userServiceClient
          .send('ratingRestaurant', {
            customerId,
            orderId,
            ...rateRestaurantDto,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status } = rateRestaurantResponse;

      if (status !== HttpStatus.CREATED) {
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
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async rateDriver(
    customerId: string,
    orderId: string,
    rateDriverDto: RateDriverDto,
  ) {
    try {
      const rateDriverResponse: IRatingResponse = await this.userServiceClient
        .send('ratingDriver', {
          customerId,
          orderId,
          ...rateDriverDto,
        })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(
                new RequestTimeoutException(
                  'Timeout. Order server has problem!',
                ),
              );
            }
            return throwError({ message: err });
          }),
        )
        .toPromise();

      const { message, status } = rateDriverResponse;

      if (status !== HttpStatus.CREATED) {
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
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //! Sự kiện thanh toán thành công của ZALOPAY
  async eventPaymentZALOPAY(
    eventPaymentZALOPAYDto: EventPaymentZALOPAYDto,
    orderId: string,
  ) {
    const eventPaymentZALOPAYResponse = await this.orderServiceClient
      .send('eventPaymentZALOPAY', {
        ...eventPaymentZALOPAYDto,
        orderId,
      })
      .toPromise();

    const { return_code, return_message } = eventPaymentZALOPAYResponse;

    return {
      return_code,
      return_message,
    };
  }

  //! Frontend gọi để update trạng thái payment ZALOPAY
  async updateZALOPAYPaymentStatus(
    orderId: string,
    customerId: string,
  ): Promise<UpdateZALOPAYPaymentStatusResponseDto> {
    try {
      //TODO:
      const updateZALOPAYPaymentStatusResponse: ISimpleResponse =
        await this.orderServiceClient
          .send('updateZALOPAYPaymentStatus', {
            orderId,
            customerId,
          })
          .pipe(
            timeout(5000),
            catchError((err) => {
              if (err instanceof TimeoutError) {
                return throwError(
                  new RequestTimeoutException(
                    'Timeout. Order server has problem!',
                  ),
                );
              }
              return throwError({ message: err });
            }),
          )
          .toPromise();

      const { message, status } = updateZALOPAYPaymentStatusResponse;

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
      };
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
        },
        500,
      );
    }
  }
}
