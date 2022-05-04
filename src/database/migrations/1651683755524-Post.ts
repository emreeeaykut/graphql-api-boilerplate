import {MigrationInterface, QueryRunner} from "typeorm";

export class Post1651683755524 implements MigrationInterface {
    name = 'Post1651683755524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
