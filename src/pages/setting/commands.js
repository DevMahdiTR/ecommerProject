import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Table} from "antd";
import {adminDeleteCommands, adminGetCommands} from "../../service/commands/commandsService";

const Commands = () => {
    const [commands, setCommands] = useState([]);
    const [update, setUpdate] = useState(1)

    useEffect(()=>{
     adminGetCommands().then(res => {
            setCommands(res.data)
      })
    },[])

    const handleDelete = (id)=>{
        adminDeleteCommands(id).then((responce)=>{
            adminGetCommands().then(res => {
                setCommands(res.data)
            })
        })
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState([]);
    const handleEdit = (record)=>{
        setUpdate(prevState => prevState+1)
        setCurrentItem(record?.commande_lines);
        setModalVisible(true);
    }

    console.log(currentItem)
    const columns = [
        {
            title:'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title:'Adresse',
            dataIndex: 'adresse',
            key: 'adresse'
        },
        {
            title:'Telephone',
            dataIndex: 'telephone',
            key: 'telephone'
        },
        {
            title:'user Name',
            key: 'name',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    {record.user.name}
                </div>
            )
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
                        className={'bg-green-400 text-gray-50 border-0'}
                         onClick={()=>{handleEdit(record)}}
                        >
                        Detail
                    </Button>
                    <Button
                        className={'bg-red-400 text-gray-50 border-0'}
                         onClick={()=>{handleDelete(record.id)}}
                        >
                        Delete
                    </Button>
                </div>
            )
        }
    ]
    const columnsDetails = [
        {
            title:'Id',
            dataIndex: 'article_id',
            key: 'article_id'
        },
        {
            title:'Product Name',
            key: 'name',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    {record?.article?.name}
                </div>
            )
        },
        {
            title:'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title:'Total',
            dataIndex: 'total',
            key: 'total'
        },
    ]
    return (
        <div className={'ServiceContainer'}>
            <br/>
            <br/>
            <Table bordered={true} dataSource={commands} columns={columns}/>
            <Modal
                title={'Detail'}
                visible={modalVisible}
                okType={"default"}
                onCancel={()=>{
                    setModalVisible(false);
                }}
                onOk={()=>{
                    setModalVisible(false);
                }}
            >
                <Table bordered={true} dataSource={currentItem} columns={columnsDetails}/>
            </Modal>
        </div>
    );
};

export default Commands;
