import { Box } from '@mui/material'
import { LeadsSection } from '../../components/LeadsSection/LeadsSection'
import { useGetStatusesQuery, useUpdateClientMutation } from '../../api/api-slices/clients-reducer'

export const LeadsPage = () => {

  const { data: statusData, isLoading: isStatusesLoading } = useGetStatusesQuery(null);

  const [updateClient, { }] = useUpdateClientMutation();

  const onUpdateClient = (id: number, stateName: string, dataToUpdate: string) => {
    updateClient({ id: id, stateName: 'status', dataToUpdate: dataToUpdate })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 2,
      minHeight: 1000,
      padding: 2
    }}>
      {!statusData || isStatusesLoading ? (
        <>Loading...</>
      ) : (
        <>
          {statusData.map((item, index, array) => {
            if (index < array.length - 1) {
              return <LeadsSection
                key={index}
                updateClient={onUpdateClient}
                status={item.name}
                nextStatus={array[index + 1].name}
              />
            }
          })}
        </>
      )}

    </Box>
  )
}
