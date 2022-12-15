import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { MainSeeder } from './seeds/MainSeeder'
import path from 'path';
const port = process.env.DB_PORT as number | undefined
const __dirname = path.resolve();


const options: DataSourceOptions & SeederOptions = ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`entities/*.{ts,js}`],
    migrations: [`migrations/*.{ts,js}`],
    seeds: [MainSeeder],
})

export const AppDataSource = new DataSource(options)