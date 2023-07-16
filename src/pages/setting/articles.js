import React, {useEffect, useState} from 'react';
import { Button,Form, Input, Modal, Table, Tabs} from "antd";

import {
    addCategories,
    deleteCategories,
    getCategories,
    updateCategories
} from "../../service/categories/categoriesService";
import {getArticlesBuCategories} from "../../service/Articles/articlesServices";

const Articles = () => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [id, setId] = useState(0);
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
            title:'price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title:'status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title:'quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title:'Actions',
            key: 'actions',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    <Button className={'bg-green-400 text-gray-50 border-0'}   onClick={()=>{handleEdit(record)}}>Edit</Button>
                    <Button className={'bg-red-400 text-gray-50 border-0'}  onClick={()=>{handleDelete(record)}}>Delete</Button>
                </div>
            )


        }
    ]

    const getDAta =  () => {
         getCategories().then(
                res =>{
                    console.log(res.data);
                    setData(res.data)
                    setId(res.data[0].id)
                })
    }
    const getArticles =  (index) => {
        getArticlesBuCategories(index).then(
                res =>{
                    setTableData(res.data.articles)
                    setId(res.data.id)
                    console.log(res.data);
                })
    }

    const handleSubmit = (value)=>{
        if (currentItem.id){
            updateCategories(value, currentItem.id).then(r=>{
                getDAta()
            })
        }else{
            addCategories(value).then(r=>{
                getDAta()
            })
        }
        setModalVisible(false);
        form.resetFields();
    }
    const handleDelete =(record)=>{
        deleteCategories(record.id).then((res)=>{
            getDAta()
        })
    }
    useEffect(()=>{
        getDAta()
    },[])
    useEffect(()=>{
        if (data.length > 0 ){
            getArticles(id)
        }
    },[data])
    return (
        <div className={'ServiceContainer'}>
            <Tabs
                tabPosition={'left'}
                onTabClick={(index)=> {
                    getArticles(index)
                }}
                items={data.map(item => {
                    return {
                        label: `${item.name}`,
                        key: item.id,
                        children: <>
                            <Button type={'default'} className={'bg-sky-400 text-gray-50 border-0'}  onClick={()=>setModalVisible(true)}>
                                Add New Articles
                            </Button>
                            <br/>
                            <br/>
                            <Table bordered={true} dataSource={tableData} columns={columns}/>
                        </>,
                    };
                })}
            />

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
                <Form form={form} onFinish={handleSubmit}  initialValues={currentItem}>
                    <Form.Item name="name" label="Name" rules={[{required: true, min: 7, message: 'min length is 7'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="price" label="price" rules={[{required: true, min: 2, message: 'min length is 2'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="description" label="description" rules={[{required: true, min: 10, message: 'min length is 10'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="owner" label="owner" rules={[{required: true, min: 4, message: 'min length is 4'}]}>
                        <Input/>
                    </Form.Item>

                </Form>
            </Modal>

        </div>
    );
};

export default Articles;
