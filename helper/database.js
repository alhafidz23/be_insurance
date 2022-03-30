require('dotenv').config();

const pgp           = require('pg-promise')();

// POSTGRES
var options = {
    host: process.env.DB_HOST, // 'localhost' is the default
    port: process.env.DB_PORT, // 5432 is the default;
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};

const db = pgp(options);


const buildInsertQuery = (tableName, datas) => {
    let query = `INSERT INTO ${tableName} (`;
    let x = 0;

    Object.keys(datas[0]).map((key) => {
        if (x==0) {
            query += `${key}`;
        }
        else {
            query += `,${key}`;
        }
        x++;
        return true;
    });

    query += `) VALUES `;

    let y = 0;
    datas.map((data) => {

        if (y == 0){
            query += '(';

            let i = 0;
            Object.keys(data).map((key) => {
                if (i==0) {
                    query += (typeof data[key] == 'number') ? `${data[key]}` : `'${data[key]}'`;
                }
                else {
                    query += (typeof data[key] == 'number') ? `,${data[key]}` : `,'${data[key]}'`;
                }
                i++;
                return true;
            });

            query += `)`; 
        }
        else {
            query += ',(';

            let i = 0;
            Object.keys(data).map((key) => {
                if (i==0) {
                    query += (typeof data[key] == 'number') ? `${data[key]}` : `'${data[key]}'`;
                }
                else {
                    query += (typeof data[key] == 'number') ? `,${data[key]}` : `,'${data[key]}'`;
                }
                i++;
                return true;
            });

            query += `)`;
        }
        y++;
        
    })

    return query;
}


const buildUpdateQuery = (tableName, updateData, whereData, defaultReturn = 'id') => {
    let query = `UPDATE ${tableName} SET `;
    let x = 1;

    let z = 1;
    Object.keys(updateData).forEach((item) => {
        if (z == 1){
            query += `${item} = $${x}`;
            x++;
        }
        else {
            query += `, ${item} = $${x}`;
            x++;
        }
        z++;
        
    })

    let y = 1;
    Object.keys(whereData).forEach((item) => {
        if (y == 1){
            query += ` WHERE ${item} = $${x} `;
            x++;
        }
        else {
            query += `AND ${item} = $${x} `;
            x++;
        } 
        y++;
    })

    query += ` RETURNING ${defaultReturn}`;
    return query; 
}


const buildUpdateQuery2 = (tableName, updateData, whereData, defaultReturn = 'id') => {
    let query = `UPDATE ${tableName} SET `;
    let x = 1;

    let z = 1;
    Object.keys(updateData).forEach((item) => {
        if (updateData[item] !== '') {
            if (z == 1){
                query += (typeof updateData[item] == 'number') ? `${item} = ${updateData[item]}` : `${item} = '${updateData[item]}'`;
                x++;
            }
            else {
                query += (typeof updateData[item] == 'number') ? `, ${item} = ${updateData[item]}` : `, ${item} = '${updateData[item]}'`;
                x++;
            }
        }
        z++;
        return true;        
    })

    let y = 1;
    Object.keys(whereData).forEach((item) => {
        if (y == 1){
            query += (typeof whereData[item] == 'number') ? ` WHERE ${item} = ${whereData[item]}` : ` WHERE ${item} = '${whereData[item]}'`;
            x++;
        }
        else {
            query += (typeof whereData[item] == 'number') ? `AND ${item} = ${whereData[item]}` : `AND ${item} = '${whereData[item]}'`;
            x++;
        }
        y++;
        return true;
    })

    query += ` RETURNING ${defaultReturn}`;
    return query; 
}


const buildInCondition = (data) => {
    let str     = `(`;
    
    for (let i = 0; i < data.length; i++) {
        if (i == 0){
            str += `'${data[i]}'`;
        }
        else {
            str += `,'${data[i]}'`;
        }
    }    

    str += ')';
    return str;
}


module.exports = {
    db,
    buildUpdateQuery,
    buildInCondition,
    buildInsertQuery,
    buildUpdateQuery2
}
