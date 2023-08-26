import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Modal, Table, Tabs} from "antd";
import {addPromotion, deactivatePromotion, deletePromotion} from "../../service/promotions/promotionsService";
import {
    addCategories, deleteCategories,
    getCategories,
    getSousCategories,
    updateCategories
} from "../../service/categories/categoriesService";
import {
    addArticlePhoto,
    addArticles,
    deleteArticles,
    getArticlesBuCategories
} from "../../service/Articles/articlesServices";

const SubCategories = () => {
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
                    <Button className={'bg-green-400 text-gray-50 border-0'}   onClick={()=>{handleEdit(record)}}>Edit</Button>
                    <Button className={'bg-red-400 text-gray-50 border-0'}  onClick={()=>{handleDelete(record)}}>Delete</Button>
                </div>
            )
        }
    ]

    const getData =  () => {
        getCategories().then(
            res =>{
                setData(res.data.filter(item=>item.parent_id === null))
                setId(res.data[0].id)
            })
    }
    const getArticles =  (index) => {
        getSousCategories(index).then(
            res =>{
                setTableData(res.data.sous_categories)
                setId(res.data.id)
            })
    }

    const handleSubmit = (value)=>{
        console.log(value);
        if (currentItem.id){
            updateCategories( {...value, 'parent_id': id}, currentItem.id).then(r=>{
                getCategories().then(
                    res =>{
                        setData(res.data.filter(item=>item.parent_id === null))
                    })
            })
        }else{
            addCategories({...value, 'parent_id': id}).then(r=>{
                getCategories().then(
                    res =>{
                        setData(res.data.filter(item=>item.parent_id === null))
                    })
            })
        }

        setModalVisible(false);
        form.resetFields();
    }

    const handleDelete =(record)=>{
        deleteCategories(record.id).then((res)=>{
            getCategories().then(
                res =>{
                    setData(res.data.filter(item=>item.parent_id === null))
                })
        })
    }
    useEffect(()=>{
        getData()
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
                items={data.map((item, index) => {
                    return {
                        index: index,
                        label: `${item.name}`,
                        key: item.id,
                        children: <>
                            <Button type={'default'} className={'bg-sky-400 text-gray-50 border-0'}  onClick={()=>setModalVisible(true)}>
                                Add New Sous Categories
                            </Button>
                            <br/>
                            <br/>
                            <Table bordered={true} dataSource={tableData} columns={columns}/>
                        </>,
                    };
                })}
            />

            <Modal
                title={currentItem.id ? 'Edit Article' : 'Add Article'}
                open={modalVisible}
                okType={"default"}
                onCancel={()=>{
                    setModalVisible(false);
                    form.resetFields();
                }}
                onOk={()=> form.submit()}
            >
                <br/>
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

export default SubCategories;