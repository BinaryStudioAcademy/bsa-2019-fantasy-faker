import csv from "csv-parser";
import fs from "fs";
import path from "path";

const now = new Date();
const results = [];

const positionMapping = {
  1: "GKP",
  2: "DEF",
  3: "MID",
  4: "FWD"
};

const nulledData = {
  player_score: 0,
  goals: 0,
  assists: 0,
  missed_passes: 0,
  goals_conceded: 0,
  saves: 0,
  yellow_cards: 0,
  red_cards: 0,
  transfers_in: 0,
  transfers_out: 0
};

const promise = new Promise((resolve, reject) => {
  fs.createReadStream(
    path.resolve(__dirname, "../seed-data/csv/player_stats.csv")
  )
    .pipe(
      csv({
        mapValues: ({ header, value }) => {
          switch (header) {
            case "first_name":
            case "second_name":
              return value;
            case "position":
              return positionMapping[value];
            default:
              return parseInt(value, 10);
          }
        }
      })
    )
    .on("data", data => {
      results.push({
        ...data,
        ...nulledData,
        createdAt: now,
        updatedAt: now
      });
    })
    .on("end", () => {
      resolve(results);
    });
});

export default promise;
