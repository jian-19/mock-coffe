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
      <div className="text-center py-8 text-gray-400">
        Nenhum dado para exibir.
      </div>
    );
  }
  const actionsHeaderIndex = headers.indexOf("Ações");
  const hasActionsColumnInHeaders = actionsHeaderIndex !== -1;
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <Table>
        {}
        <TableHeader className="bg-gray-700">
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200 ${
                  header === "Ações" ? "text-center" : ""
                }`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {}
        <TableBody className="divide-y divide-gray-700">
          {rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-600">
              {}
              {}
              {headers.map((header, index) => {
                if (header === "Ações") {
                  return null;
                }
                const cellValue = row[header]; 
                if (cellValue === undefined && header === "Nome") {
                }


                return (
                  <TableCell
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-100"
                  >
                    {cellValue}
                  </TableCell>
                );
              })}

              {}
              {hasActionsColumnInHeaders && Options && (
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center items-center text-gray-100">
                  <Options rowData={row} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}