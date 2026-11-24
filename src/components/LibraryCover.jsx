import React from 'react';

/**
 * Cover of the Library Management API. The project has no screen (it is an API), so the cover shows what it is: the loan endpoints of its README
 * as a request list, with the stack on top. Drawn in code, with the real routes.
 */
const ROUTES = [
  ['POST', '/api/emprestimos', '201'],
  ['POST', '/api/emprestimos/{id}/devolver', '200'],
  ['GET', '/api/usuarios/{id}/multas', '200'],
  ['GET', '/api/exemplares/disponiveis', '200']
];

export default function LibraryCover() {
  return (
    <div className="lib-cover" aria-hidden="true">
      <div className="lib-cover__spines">
        {[34, 52, 40, 62, 46, 56, 38, 50].map((height, index) => <i key={index} style={{ height: `${height}%`, '--i': index }} />)}
      </div>
      <div className="lib-cover__panel">
        <div className="lib-cover__bar"><span /><span /><span /><b>Library Management API</b></div>
        <ul>
          {ROUTES.map(([method, route, code]) => (
            <li key={route}>
              <strong className={`m-${method.toLowerCase()}`}>{method}</strong>
              <code>{route}</code>
              <em>{code}</em>
            </li>
          ))}
        </ul>
        <p>Java 17 · Spring Boot · JPA · PostgreSQL · PL/pgSQL · Flyway</p>
      </div>
    </div>
  );
}
