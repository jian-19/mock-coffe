"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function DocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    async function fetchSpec() {
      const response = await fetch("/api/swagger"); // Rota da sua especificação
      const data = await response.json();
      setSpec(data);
    }
    fetchSpec();
  }, []);

  if (!spec) {
    return <div>Carregando documentação...</div>;
  }

  return (
    <div className="bg-slate-200 p-8 rounded-2xl">
      <SwaggerUI spec={spec} className="" />
    </div>
  );
}

export default DocsPage;
