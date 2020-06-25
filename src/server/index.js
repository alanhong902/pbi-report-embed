const express = require('express');
const fetch = require('node-fetch');

const app = express();

const config = require('./config');

app.use(express.static('dist'));
app.get('/api/powerbi', (req, res) => {
  fetch(
    `https://login.microsoftonline.com/${config.powerbi.tenantID}/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        resource: 'https://analysis.windows.net/powerbi/api',
        client_id: config.powerbi.clientID,
        client_secret: config.powerbi.clientSecret,
        grant_type: 'client_credentials',
      }),
    }
  )
    .then(response => response.json())
    .then((result) => {
      const accessToken = result.access_token;
      fetch(
        `https://api.powerbi.com/v1.0/myorg/groups/${config.powerbi.groupID}/reports/${config.powerbi.reportID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then(response => response.json())
        .then((reportResult) => {
          res.send({
            success: true,
            powerbi: {
              reportId: config.powerbi.reportID,
              groupId: config.powerbi.groupID,
              embedUrl: reportResult.embedUrl,
              accessToken,
            }
          });
        }).catch(() => {
          res.send({
            success: false
          });
        });
    })
    .catch(() => {
      res.send({
        success: false
      });
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
