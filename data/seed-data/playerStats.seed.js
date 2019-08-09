import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const now = new Date();
const results = [];

const promise = new Promise((resolve, reject) => {
  fs.createReadStream(
    path.resolve(__dirname, '../seed-data/csv/player_stats.csv')
  )
    .pipe(
      csv({
        mapValues: ({ header, index, value }) => {
          if (
            header != 'firstName' &&
            header != 'secondName' &&
            header != 'position'
          ) {
            return parseFloat(value);
          }
          return value;
        }
      })
    )
    .on('data', data => {
      data.createdAt = now;
      data.updatedAt = now;
      results.push(data);
    })
    .on('end', () => {
      resolve(results);
    });
});

export default promise;