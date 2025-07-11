// logger.js

import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './temp/error.log', level: 'error' }),
        new transports.File({ filename: './temp/combined.log' })
    ]
});

export const logRequestDetails = (req, res, next) => {
    logger.info(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
};

export default logRequestDetails;
