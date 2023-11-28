import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import SignInPage from "../pages/SignInPage/SignInPage"
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts"
import { adminRoutes, anyBodyRoutes, managerRoutes } from "../routes"
import { useEffect } from "react"
import { fetchCheckAuth } from "../api/thunks/userThunks"
import { useAppDispatch } from "../hooks/redux"

type PropsType = {
    isAuth:boolean,
    role:string
}

export const AppRouter: React.FC<PropsType> = ({isAuth, role})=>{

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
                    {role === "ADMIN" && (
                        <>
                            {adminRoutes.map((e)=><Route path={e.path} Component={e.element}/>)}
                        </>
                    )}
                    {(role === "ADMIN" || "manager") && (
                        <>
                            {managerRoutes.map((e)=><Route path={e.path} Component={e.element}/>)}
                        </>
                    )}
                    {anyBodyRoutes.map((e)=><Route path={e.path} Component={e.element}/>)}
                    <Route path='*' element={<Navigate to={HOME_ROUTE} replace />} />
                </>
            )}
        </Routes>
    )
}