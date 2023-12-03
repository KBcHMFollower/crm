export const CLIENTS_SECTION = 'client-section';
export const WORKERS_SECTION = 'workers-section'
export const LEADS_SECTION = 'leads-section'
export const ADMIN = 'all'
export const CREATE_WORKER = 'create-worker'
export const CREATE_CLIENT = 'create-client'
export const UPDATE_WORKER = 'update-worker'
export const UPDATE_CLIENT = 'update-client'
export const CREATE_NOTE = 'create-note'

export const checkRights = (rightList:string[], right:string)=>{
    return rightList.some(e=>((e == right) || (e == ADMIN)))
}