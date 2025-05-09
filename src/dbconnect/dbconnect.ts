import { DataSource } from "typeorm";
import "reflect-metadata";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "testdatabase",
  entities: ["src/entities/*{.ts,.js}"],
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "migrations",

  synchronize: true,
  logging: true,
});
