import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { ComplaintEntity } from '../../models/complaint.entity';

export class ComplaintService {
  constructor(
    @InjectRepository(ComplaintEntity)
    protected readonly repository: Repository<ComplaintEntity>
  ) {}

  async create(entity: DeepPartial<ComplaintEntity>): Promise<ComplaintEntity> {
    try {
      return await this.repository.save(entity);
    } catch (error) {
      /* error =
      {
        "query": "INSERT INTO \"complaint\"(\"fromDate\", \"version\", \"complaintType\", \"message\", \"stationId\") VALUES (DEFAULT, $1, $2, $3, $4) RETURNING \"id\", \"fromDate\", \"version\"",
        "parameters": [
          0,
          "string",
          "string",
          "string"
        ],
        "driverError": {
          "length": 283,
          "name": "error",
          "severity": "ERROR",
          "code": "23503",
          "detail": "Key (stationId)=(string) is not present in table \"station\".",
          "schema": "public",
          "table": "complaint",
          "constraint": "FK_5795e32a6ad50aee5c720864fa6",
          "file": "ri_triggers.c",
          "line": "2599",
          "routine": "ri_ReportViolation"
        },
        "length": 283,
        "severity": "ERROR",
        "code": "23503",
        "detail": "Key (stationId)=(string) is not present in table \"station\".",
        "schema": "public",
        "table": "complaint",
        "constraint": "FK_5795e32a6ad50aee5c720864fa6",
        "file": "ri_triggers.c",
        "line": "2599",
        "routine": "ri_ReportViolation"
      }
      */
      // TODO Log error
      if (error && '23503' === error.code) {
        throw new NotFoundException(`Tankstelle mit ID ${entity.stationId} existiert nicht.`);
      }
      throw new BadRequestException();
    }
  }
}
