import React, { useEffect, useState } from 'react';
import PowerBiEmbed from 'react-powerbi-embed';

import './app.css';

export default () => {
  const [embedConfig, setEmbedConfig] = useState({
    AuthenticationType: 'ServicePrincipal',
    embedTokenType: 'reports',
    embedType: 'report',
    filterPaneEnabled: false,
    navContentPaneEnabled: false,
    width: '100%',
    height: 'calc(100vh - 16px)',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/powerbi')
      .then(response => response.json())
      .then((result) => {
        if (result.success) {
          setEmbedConfig({ ...embedConfig, ...result.powerbi });
          setLoading(false);
        }
      });
  }, []);

  const PbiFailErrorMessage = (
    <div className="App-link">Oops! Looks like something went wrong!</div>
  );

  const invalidConfigErrorMessage = (
    <div className="App-link">
      Oops! Looks like something went wrong,
      <br />
      Please contact
      {' '}
      <a href="mailto:support@answeriq.com?Subject=Error 500">
        support@yoursupport.com
      </a>
    </div>
  );

  return !loading ? (
    <PowerBiEmbed
      config={embedConfig}
      PbiFailErrorMessage={PbiFailErrorMessage}
      invalidConfigErrorMessage={invalidConfigErrorMessage}
      hideDefaultError={false}
    />
  ) : (
    <div>loading</div>
  );
};
