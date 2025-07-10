'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function DocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    async function fetchSpec() {
      const response = await fetch('/api/swagger'); // Rota da sua especificação
      const data = await response.json();
      setSpec(data);
    }
    fetchSpec();
  }, []);

  if (!spec) {
    return <div>Carregando documentação...</div>;
  }

  return <SwaggerUI spec={spec} />;
}

export default DocsPage;