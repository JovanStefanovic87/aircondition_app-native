import { DatabaseVersionType } from "../types";

export const mapDatabaseVersionType = (record: DatabaseVersionType): DatabaseVersionType => {
    return {
        version: record.version ? record.version : 0,
    };
};