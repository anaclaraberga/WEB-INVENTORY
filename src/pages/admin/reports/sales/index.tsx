import { Button } from "@/components/custom/button"
import { DataTable } from "@/components/data-table/data-table"
import { useToast } from "@/components/ui/use-toast"
import { BaseTemplate } from "@/template/Base"
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { columns, toolbar } from "./data-table/config"

export const SalesReport = () => {
  const [data, setData] = useState([])
  const { toast } = useToast()
  const tableRef = useRef(null)
  const handlePrint = useReactToPrint({
    contentRef: tableRef as any,
  });

  const handleDownloadReport = () => {
    handlePrint(tableRef as any);
  };

  useEffect(() => {
    (async () => {
      try {
        // const response = await SalesService.findAll()
        setData([])
      } catch (error) {
        console.log(error)
        toast({
          title: 'Não foi possível conectar com o servidor',
          description: 'Tente novamente mais tarde',
        })
      }
    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Vendas</h2>
          <Button onClick={handleDownloadReport}>Exportar</Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={data} columns={columns} toolbar={toolbar} ref={tableRef} />
      </div>
    </BaseTemplate>
  )
}