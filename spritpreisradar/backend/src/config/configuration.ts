// File implemented as described in https://docs.nestjs.com/techniques/configuration

export default () => ({
  database: {
    type: 'postgres' as const,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
  },
  seeddata: {
    filename: process.env.SEED_DATA_FILE
  }
});

export interface SeedDataConfig {
  filename: string;
}
