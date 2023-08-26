import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Input, Modal, Table} from "antd";
import {
    addCategories,
    deleteCategories,
    getCategories,
    updateCategories
} from "../../service/categories/categoriesService";

const Categories = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [update, setUpdate] = useState(1)
    const [form] = Form.useForm();


    const handleEdit = (record)=>{
        setCurrentItem(record);
        setUpdate(prevState => prevState+1)
        setModalVisible(true);
    }


    const columns = [
        {
            title:'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title:'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title:'Slug',
            dataIndex: 'slug',
            key: 'slug'
        },
        {
            title:'description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title:'Actions',
            key: 'actions',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    <Button
                        className={'bg-green-400 text-gray-50 border-0'}
                        onClick={()=>{handleEdit(record)}}>
                        Edit
                    </Button>
                    <Button
                        className={'bg-red-400 text-gray-50 border-0'}
                        onClick={()=>{handleDelete(record)}}>
                        Delete
                    </Button>
                </div>
            )
        }
    ]

    const getData =  () => {
             getCategories().then(
                res =>{
                    console.log(res.data);
                   setData(res.data.filter(item=>item.parent_id === null))
                })
    }
    const handleSubmit = (value)=>{
        if (currentItem.id){
            updateCategories(value, currentItem.id).then(r=>{
                getData()
            })
        }else{
            addCategories(value).then(r=>{
                getData()
            })
        }
        setModalVisible(false);
        form.resetFields();
    }
    const handleDelete =(record)=>{
        console.log(record.id)
        deleteCategories(record?.id).then((res)=>{
            getData()
        })
    }
    useEffect(()=>{
        getData()
    },[])



    return (
        <div className={'ServiceContainer'}>
            <Button type={'default'} className={'bg-sky-400 text-gray-50 border-0'} onClick={()=>setModalVisible(true)}>
                Add New Categories
            </Button>

            <br/>
            <br/>
            <Table bordered={true} dataSource={data} columns={columns}/>
            <Modal
                title={currentItem.id ? 'Edit Categorie' : 'Add Catgorie'}
                visible={modalVisible}
                okType={"default"}
                onCancel={()=>{
                    setModalVisible(false);
                    form.resetFields();
                }}
                onOk={()=>form.submit()}
            >
                <Form form={form} onFinish={handleSubmit} initialValues={currentItem}>
                    <Form.Item name="name" label="Name" rules={[{required: true, message: 'name is required'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="description" label="description" rules={[{required: true, min: 2, message: 'min length is 2'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="slug" label="slug" rules={[{required: true, min: 3, message: 'min length is 3'}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default Categories;
