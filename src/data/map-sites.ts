/**
 * Footprint map pins from the owner's project and O&M lists (Josh Butler, 2026-11-10,
 * "Website Map- Updates"; extracted from the historical project analysis workbook). Town level
 * only: one entry per town, rounded to about 0.01°, with no street addresses, client names or
 * sizes. Town centres from OpenStreetMap (© OpenStreetMap contributors, ODbL), looked up by
 * town and state only. Data quirks follow the address, not the project name (the Franklin
 * project is in Franklin, KY; Kenansville is at Warsaw; Floyd Road is at Garysburg).
 *
 * Projects with `coordinates` in src/content/projects add their own pins as before; pins in
 * the same town merge into one.
 */
export interface MapTown {
  town: string;
  state: string;
  lat: number;
  lon: number;
  /** Every project here was White Electrical renewable-division subcontract work, 2010–2016. */
  heritage?: true;
}

/**
 * Pin the towns whose only work predates Axis (the White Electrical renewable division,
 * 2010–2016)? Josh's list includes them; set to false to leave them off (owner to confirm,
 * 2026-11-20).
 */
export const showHeritageTowns = true;

/** Towns with a completed project: 81 projects, 2010 to 2026, in 67 towns. */
export const completedTowns: MapTown[] = [
  { town: 'Amity', state: 'AR', lat: 34.26, lon: -93.46 },
  { town: 'Cabot', state: 'AR', lat: 34.97, lon: -92.02 },
  { town: 'Camden', state: 'AR', lat: 33.58, lon: -92.83 },
  { town: 'Harrison', state: 'AR', lat: 36.23, lon: -93.11 },
  { town: 'Hot Springs', state: 'AR', lat: 34.5, lon: -93.06 },
  { town: 'Judsonia', state: 'AR', lat: 35.27, lon: -91.64 },
  { town: 'North Little Rock', state: 'AR', lat: 34.77, lon: -92.27 },
  { town: 'Stuttgart', state: 'AR', lat: 34.5, lon: -91.55 },
  { town: 'Alameda', state: 'CA', lat: 37.77, lon: -122.24, heritage: true },
  { town: 'Keenesburg', state: 'CO', lat: 40.11, lon: -104.52 },
  { town: 'Fort Stewart', state: 'GA', lat: 31.87, lon: -81.61, heritage: true },
  { town: 'Gainesville', state: 'GA', lat: 34.3, lon: -83.82 },
  { town: 'Sandy Springs', state: 'GA', lat: 33.92, lon: -84.38, heritage: true },
  { town: 'Franklin', state: 'KY', lat: 36.72, lon: -86.58 },
  { town: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29 },
  { town: 'Walnut Grove', state: 'MS', lat: 32.59, lon: -89.46 },
  { town: 'Ahoskie', state: 'NC', lat: 36.29, lon: -76.99 },
  { town: 'Apex', state: 'NC', lat: 35.73, lon: -78.85, heritage: true },
  { town: 'Asheboro', state: 'NC', lat: 35.71, lon: -79.81 },
  { town: 'Biscoe', state: 'NC', lat: 35.36, lon: -79.78, heritage: true },
  { town: 'Bostic', state: 'NC', lat: 35.36, lon: -81.84 },
  { town: 'Burlington', state: 'NC', lat: 36.1, lon: -79.44, heritage: true },
  { town: 'Butner', state: 'NC', lat: 36.13, lon: -78.76 },
  { town: 'Cary', state: 'NC', lat: 35.79, lon: -78.78, heritage: true },
  { town: 'Chapel Hill', state: 'NC', lat: 35.91, lon: -79.06, heritage: true },
  { town: 'Chinquapin', state: 'NC', lat: 34.83, lon: -77.82 },
  { town: 'Clyde', state: 'NC', lat: 35.53, lon: -82.91, heritage: true },
  { town: 'Conway', state: 'NC', lat: 36.44, lon: -77.23 },
  { town: 'Council', state: 'NC', lat: 34.42, lon: -78.47 },
  { town: 'Durham', state: 'NC', lat: 36.0, lon: -78.9, heritage: true },
  { town: 'Ellerbe', state: 'NC', lat: 35.07, lon: -79.76, heritage: true },
  { town: 'Elon', state: 'NC', lat: 36.1, lon: -79.51, heritage: true },
  { town: 'Fort Bragg', state: 'NC', lat: 35.14, lon: -79.15, heritage: true },
  { town: 'Four Oaks', state: 'NC', lat: 35.45, lon: -78.43, heritage: true },
  { town: 'Garysburg', state: 'NC', lat: 36.45, lon: -77.56 },
  { town: 'Graham', state: 'NC', lat: 36.07, lon: -79.4, heritage: true },
  { town: 'Greenville', state: 'NC', lat: 35.61, lon: -77.37 },
  { town: 'High Point', state: 'NC', lat: 35.96, lon: -80.01, heritage: true },
  { town: 'Holly Springs', state: 'NC', lat: 35.65, lon: -78.83 },
  { town: 'Lincolnton', state: 'NC', lat: 35.47, lon: -81.25, heritage: true },
  { town: 'Louisburg', state: 'NC', lat: 36.1, lon: -78.3, heritage: true },
  { town: 'Lumberton', state: 'NC', lat: 34.62, lon: -79.01, heritage: true },
  { town: 'Mebane', state: 'NC', lat: 36.1, lon: -79.27, heritage: true },
  { town: 'Mooresboro', state: 'NC', lat: 35.3, lon: -81.7, heritage: true },
  { town: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, heritage: true },
  { town: 'Rutherfordton', state: 'NC', lat: 35.37, lon: -81.96, heritage: true },
  { town: 'Sanford', state: 'NC', lat: 35.48, lon: -79.18, heritage: true },
  { town: 'Shelby', state: 'NC', lat: 35.29, lon: -81.54, heritage: true },
  { town: 'Teachey', state: 'NC', lat: 34.77, lon: -78.01 },
  { town: 'Warsaw', state: 'NC', lat: 35.0, lon: -78.09, heritage: true },
  { town: 'Wendell', state: 'NC', lat: 35.78, lon: -78.37 },
  { town: 'Wilson', state: 'NC', lat: 35.72, lon: -77.91 },
  { town: 'Yadkinville', state: 'NC', lat: 36.13, lon: -80.66 },
  { town: 'Reading', state: 'PA', lat: 40.34, lon: -75.93 },
  { town: 'Florence', state: 'SC', lat: 34.2, lon: -79.77, heritage: true },
  { town: 'North Charleston', state: 'SC', lat: 32.85, lon: -79.97, heritage: true },
  { town: 'Rock Hill', state: 'SC', lat: 34.92, lon: -81.03, heritage: true },
  { town: 'Bolivar', state: 'TN', lat: 35.26, lon: -88.99 },
  { town: 'Clarksville', state: 'TN', lat: 36.53, lon: -87.36 },
  { town: 'Cleveland', state: 'TN', lat: 35.16, lon: -84.88, heritage: true },
  { town: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, heritage: true },
  { town: 'Lancaster', state: 'TX', lat: 32.59, lon: -96.76, heritage: true },
  { town: 'Waxahachie', state: 'TX', lat: 32.39, lon: -96.84, heritage: true },
  { town: 'Christiansburg', state: 'VA', lat: 37.13, lon: -80.41 },
  { town: 'Elkton', state: 'VA', lat: 38.41, lon: -78.62, heritage: true },
  { town: 'Lynchburg', state: 'VA', lat: 37.41, lon: -79.14, heritage: true },
  { town: 'Quantico', state: 'VA', lat: 38.52, lon: -77.29, heritage: true },
];

/** Towns with an active O&M contract: 28 sites in 23 towns. */
export const omTowns: MapTown[] = [
  { town: 'Wilmer', state: 'AL', lat: 30.82, lon: -88.36 },
  { town: 'Alapaha', state: 'GA', lat: 31.39, lon: -83.22 },
  { town: 'Clyo', state: 'GA', lat: 32.48, lon: -81.27 },
  { town: 'Collins', state: 'GA', lat: 32.18, lon: -82.11 },
  { town: 'Dudley', state: 'GA', lat: 32.54, lon: -83.07 },
  { town: 'Gibson', state: 'GA', lat: 33.23, lon: -82.6 },
  { town: 'Girard', state: 'GA', lat: 33.04, lon: -81.71 },
  { town: 'Guyton', state: 'GA', lat: 32.34, lon: -81.39 },
  { town: 'Jesup', state: 'GA', lat: 31.61, lon: -81.89 },
  { town: 'McRae-Helena', state: 'GA', lat: 32.07, lon: -82.9 },
  { town: 'Milan', state: 'GA', lat: 32.02, lon: -83.06 },
  { town: 'Soperton', state: 'GA', lat: 32.38, lon: -82.59 },
  { town: 'Twin City', state: 'GA', lat: 32.58, lon: -82.16 },
  { town: 'Waynesboro', state: 'GA', lat: 33.09, lon: -82.02 },
  { town: 'Woodland', state: 'GA', lat: 32.79, lon: -84.56 },
  { town: 'Asheboro', state: 'NC', lat: 35.71, lon: -79.81 },
  { town: 'Chinquapin', state: 'NC', lat: 34.83, lon: -77.82 },
  { town: 'Greenville', state: 'NC', lat: 35.61, lon: -77.37 },
  { town: 'Lumberton', state: 'NC', lat: 34.62, lon: -79.01 },
  { town: 'Mount Olive', state: 'NC', lat: 35.2, lon: -78.07 },
  { town: 'Pink Hill', state: 'NC', lat: 35.06, lon: -77.74 },
  { town: 'Tabor City', state: 'NC', lat: 34.15, lon: -78.88 },
  { town: 'Teachey', state: 'NC', lat: 34.77, lon: -78.01 },
];
