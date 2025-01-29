/**
 * 
 */
import { JSONFilePreset } from 'lowdb/node';
import sqlite3 from 'sqlite3';
import { join } from 'path';
import { cwd } from 'process';

const filePath = join(cwd(), 'db.json');
export const dbSqlite3 = new sqlite3.Database('./db.sqlite');
export const initilizeDb = () =>{
    dbSqlite3.serialize(() => {
        dbSqlite3.run('CREATE TABLE causes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, image TEXT, status TEXT)')
        .run('CREATE TABLE contributions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, amount INTEGER, causeId INTEGER)');
    });
}
// let filePath = '';
// // const getPath = 
// (() => {
//     if (process.env.NODE_ENV === 'test') {
//         filePath = join(cwd(), 'db_test.json');
//         console.log('test db',filePath)
//         // return join(cwd(), 'db_test.json');
//     } else {
//         filePath = join(cwd(), 'db.json');
//         // return join(cwd(), 'db.json');
//     }
// })();
// const filePath = getPath();
export const db = await JSONFilePreset(filePath, { "causes": [], "contributions": [] });

// export default db;