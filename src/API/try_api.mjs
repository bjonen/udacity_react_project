// Run with node try_api.mjs

import { _getUsers } from "./_DATA.js";
//const parse = require("./_DATA.mjs");

async function getUsers() {
  const response = await _getUsers();
  console.log(response);
}
getUsers();
