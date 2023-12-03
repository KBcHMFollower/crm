import { Navigate, Route, Routes} from "react-router-dom"
import SignInPage from "../pages/SignInPage/SignInPage"
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/route-consts"
import { adminRoutes, anybodyRoutes, cleitnSectionRoutes, leadsSectionRoutes, workerSectionRoutes} from "../routes"
import { useEffect } from "react"
import { fetchCheckAuth } from "../api/thunks/userThunks"
import { useAppDispatch } from "../hooks/redux"
import { ADMIN, CLIENTS_SECTION, LEADS_SECTION, WORKERS_SECTION, checkRights } from "../utils/rights-utils"

type PropsType = {
    isAuth:boolean,
    rights:string[]
}

export const AppRouter: React.FC<PropsType> = ({isAuth, rights})=>{

    useEffect(()=>{
        dispatch(fetchCheckAuth())
      },[])
    
      const dispatch = useAppDispatch()

    return(
        <Routes>
            {!isAuth ? (
                <>
                    <Route path={LOGIN_ROUTE} element={<SignInPage />} />
                    <Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />} />
                </>
            ) :  (
                <>
                    {checkRights(rights, ADMIN) && (
                        <>
                            {adminRoutes.map((e)=><Route key={e.path} path={e.path} Component={e.element}/>)}
                        </>
                    )}
                    {checkRights(rights, CLIENTS_SECTION) && (
                        <>
                            {cleitnSectionRoutes.map((e)=><Route key={e.path} path={e.path} Component={e.element}/>)}
                        </>
                    )}
                    {checkRights(rights, WORKERS_SECTION) && (
                        <>
                            {workerSectionRoutes.map((e)=><Route key={e.path} path={e.path} Component={e.element}/>)}
                        </>
                    )}
                    {checkRights(rights, LEADS_SECTION) && (
                        <>
                            {leadsSectionRoutes.map((e)=><Route key={e.path} path={e.path} Component={e.element}/>)}
                        </>
                    )}
                    {anybodyRoutes.map((e)=><Route key={e.path} path={e.path} Component={e.element}/>)}
                    <Route path='*' element={<Navigate to={HOME_ROUTE} replace />} />
                </>
            )}
        </Routes>
    )
}