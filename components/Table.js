import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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
            {}
            <TableCell>{row.Nome}</TableCell>
            <TableCell>{row.Descrição}</TableCell>
            <TableCell>{row.Preço}</TableCell>

            {}
            {}
            <TableCell className="flex justify-center items-center">
              {Options && <Options rowData={row} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}