import { ApiProperty } from "@nestjs/swagger";

export class ImageDtoResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    filePath: string
    @ApiProperty()
    fileName: string
    @ApiProperty()
    fileSize: number
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    url: string


}