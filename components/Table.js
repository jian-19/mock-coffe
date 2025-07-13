import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"; // Assumo que estes são componentes Shadcn UI

export default function CustomTable({ Options, headers, rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum dado para exibir.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead
              key={index}
              // Mantenha 'text-center' para o cabeçalho "Ações"
              // Ou adicione 'flex justify-center' se preferir consistência
              className={header === "Ações" ? "text-center" : ""}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {/* Células de dados */}
            <TableCell>{row.Nome}</TableCell>
            <TableCell>{row.Descrição}</TableCell>
            <TableCell>{row.Preço}</TableCell>

            {/* Célula para a coluna de Ações */}
            {/* MUDANÇA AQUI: Adicione 'flex justify-center items-center' */}
            <TableCell className="flex justify-center items-center">
              {Options && <Options rowData={row} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}