import { ApiProperty } from '@nestjs/swagger';

export class FetchMenuItemToppingOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched menu item toppings successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      results: [
        {
          id: 'be3770e6-0fe5-4167-84e3-3032fcfc607a',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          menuItemId: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
          toppingItemId: '7b1f3536-8e93-4555-b52b-be471c6b3b96',
          customPrice: 5000,
        },
        {
          id: 'd4383000-97ed-480b-bf6d-3c7729b88d28',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          menuItemId: '749bae27-4f9d-4504-a951-23fd5418bf6f',
          toppingItemId: '7b1f3536-8e93-4555-b52b-be471c6b3b96',
          customPrice: null,
        },
        {
          id: 'b4bf105c-6bb4-4b0d-ad5a-6ba4f13e87af',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          menuItemId: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
          toppingItemId: '5eac3acf-dd82-4781-9752-ecf2c0b126cf',
          customPrice: null,
        },
      ],
      size: 10,
      total: 1,
    },
    nullable: true,
  })
  data: any;
}
