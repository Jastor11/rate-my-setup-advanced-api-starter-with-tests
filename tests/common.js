const db = require("../db.js")

async function commonBeforeAll() {
  // any database actions
  // we want to take before the tests
}

async function commonBeforeEach() {
  await db.query("BEGIN")
}

async function commonAfterEach() {
  await db.query("ROLLBACK")
}

async function commonAfterAll() {
  await db.end()
}

module.exports = {
  commonAfterAll,
  commonBeforeAll,
  commonAfterEach,
  commonBeforeEach,
}
