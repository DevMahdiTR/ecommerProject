import React, {useEffect, useState} from 'react';
import { Button,Form, Input, Modal, Table, Tabs, Steps} from "antd";

import {
    addCategories,
    deleteCategories,
    getCategories,
    updateCategories
} from "../../service/categories/categoriesService";
import {
    addArticlePhoto,
    addArticles,
    deleteArticles,
    getArticlesBuCategories
} from "../../service/Articles/articlesServices";

const Articles = () => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [id, setId] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [update, setUpdate] = useState(1)
    const [form] = Form.useForm();
    const [step, setStep] = useState(0);
    const [artImg, setArtImg] = useState('');
    const [article_id, setArticle_id] = useState(null);
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

    const getData =  () => {
         getCategories().then(
                res =>{
                    setData(res.data)
                    setId(res.data[0].id)
                })
    }
    const getArticles =  (index) => {
        getArticlesBuCategories(index).then(
                res =>{
                    setTableData(res.data.articles)
                    setId(res.data.id)
                })
    }

    const onImageChange = (event) => {
            setArtImg(event.target.files[0])
    }
    const onImageUpload = ()  => {
        const formData = new FormData();
        formData.append(
            'image',
            artImg,
            artImg.name);
        return formData;
    }
const handleSubmit2 = (value) => {
        let i = onImageUpload();
        addArticlePhoto(i, article_id).then(r=>{
            console.log(r.data)
        })
}
   const handleSubmit = (value)=>{
        console.log(value);
            addArticles({...value, 'category_id': id}).then(r=>{
                console.log(r.data.id)
                setArticle_id(r.data.id)
                getData()
            })

        setStep(1);
        // setModalVisible(false);
        form.resetFields();
    }

    const handleDelete =(record)=>{
        deleteArticles(record.id).then((res)=>{
            getData()
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
                                Add New Article
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
                <Steps current={step} items={[
                    {
                        title: 'Add Article information',
                        content: 'First-content',
                    },
                    {
                        title: 'Add Article image',
                        content: 'Second-content',
                    }
                ]}/>
                <br/>
                <br/>
                { step === 0?
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
                    <Form.Item name="quantity" label="Quantity" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            :
                <Form form={form} onFinish={handleSubmit2}  initialValues={currentItem}>
                    <Form.Item name="image" label="Image" rules={[{required: true, min: 7, message: 'min length is 7'}]}>
                        <input value={artImg} type="file" onChange={onImageChange}/>
                    </Form.Item>
                </Form>
            }
            </Modal>

        </div>
    );
};

export default Articles;
