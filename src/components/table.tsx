import { Domains } from '@/types/domains'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function DomainsTable({ domains }: { domains: Domains }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Available Domains</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {domains.map((domain) => (
          <TableRow key={domain}>
            <TableCell className="font-medium">{domain}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
