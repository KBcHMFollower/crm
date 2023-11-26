import { Box} from '@mui/material'
import { LeadsSection } from '../../components/LeadsSection/LeadsSection'
import { useGetStatusesQuery } from '../../api/api-slices/clients-reducer'

export const LeadsPage = () => {

  const {data: statusData, isLoading:  isStatusesLoading} = useGetStatusesQuery(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, minHeight: 1000, padding: 2 }}>
      {!statusData || isStatusesLoading ? (
        <>Loading...</>
      ) : (
        <>
        <LeadsSection status={statusData[0].name} nextStatus={statusData[1].name}/>
        <LeadsSection status={statusData[1].name} nextStatus={statusData[2].name}/>
        <LeadsSection status={statusData[2].name} nextStatus={statusData[3].name}/>
        </>
      )}
      
    </Box>
  )
}
