import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useEffect } from 'react'

function UsersSettings() {

    useEffect(() => {
        axios.get(`/api/UsersSettings`).then(res => {

        }).catch((error) => {
            if(error.response.status === 500 ) {
                
            }
        })
    },[])


    return (
        <div>
            <div className="container">
                <div className="row">
                    <Panel header="List of Users">
                        <DataTable paginator paginatorLeft rows={10} size='small' selectionMode={'single'}>
                            
                        </DataTable>
                    </Panel>
                </div>
            </div>
        </div>
    )
}

export default UsersSettings