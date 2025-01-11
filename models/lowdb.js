/**
 * 
 */
import { JSONFilePreset } from 'lowdb/node';
import { join } from 'path';
import { cwd } from 'process';

const filePath = join(cwd(), 'db.json');
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
const db = await JSONFilePreset(filePath, { "causes": [], "contributions": [] });
export default db;