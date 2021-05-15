import { ApiProperty } from '@nestjs/swagger';
import { IRestaurantData } from '../interfaces';

export class GetRestaurantInformationResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      restaurant: {
        id: 'fef41594-94b8-469e-82c9-ea8b244693b9',
        name: 'Quán Ăn Maika',
        coverImageUrl: 'http://lorempixel.com/640/480',
        videoUrl: '0',
        numRate: 0,
        rating: 0,
        address: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
        city: 'Hồ Chí Minh',
        area: 'TPHCM',
        phone: '0949657934',
        geo: {
          latitude: 3.253,
          longitude: -12.7589,
        },
        openHours: [
          {
            id: '52563451-2b6d-4257-830a-f5171c5b1dd8',
            day: 'Monday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
          {
            id: 'e6b9de2e-c547-4d1c-826b-c9d165b8ebec',
            day: 'Tuesday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
          {
            id: '86da81b4-01ec-47d0-9035-0cb91ae0dff1',
            day: 'Wednesday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
          {
            id: '699ff72e-3432-4ca8-8e6e-09dc66eeff83',
            day: 'Thursday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
          {
            id: '13f7e0de-13e0-4fb8-8836-7910c41fa742',
            day: 'Friday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
          {
            id: '6f4cfde1-e9df-49a8-b8b0-cc85678e6969',
            day: 'Saturday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
          {
            id: '3aae1654-0190-4b84-9486-5d8b9e49882e',
            day: 'Sunday',
            fromHour: 8,
            fromMinute: 0,
            toHour: 22,
            toMinute: 0,
          },
        ],
        categories: ['RESTAURANT'],
      },
    },
    nullable: true,
  })
  data: IRestaurantData;
}
