import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDisplay = ({ spec }) => {
  if (!spec) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Nenhuma especificação para exibir.
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <SwaggerUI spec={spec} />
    </div>
  );
};

export default SwaggerDisplay;