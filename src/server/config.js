require('dotenv').config();

module.exports = {
  powerbi: {
    clientID: process.env.PBI_CLIENT_ID,
    clientSecret: process.env.PBI_CLIENT_SECRET,
    tenantID: process.env.PBI_TENANT_ID,
    groupID: process.env.PBI_GROUP_ID,
    reportID: process.env.PBI_REPORT_ID,
  },
};
