import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Table} from "antd";
import {adminGetCommands} from "../../service/commands/commandsService";

const Commands = () => {
    const [commands, setCommands] = useState([]);
    useEffect(()=>{
     adminGetCommands().then(res => {
            setCommands(res.data)
      })
    },[])

    const columns = [
        {
            title:'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title:'User ID',
            dataIndex: 'User_id',
            key: 'user_id'
        },
        {
            title:'Total',
            dataIndex: 'total',
            key: 'total'
        },
        {
            title:'Actions',
            key: 'actions',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    <Button
                        className={'bg-red-400 text-gray-50 border-0'}
                        // onClick={()=>{handleDelete(record)}}
                        >
                        Delete
                    </Button>
                </div>
            )
        }
    ]
    return (
        <div className={'ServiceContainer'}>
            <br/>
            <br/>
            <Table bordered={true} dataSource={commands} columns={columns}/>
        </div>
    );
};

export default Commands;
