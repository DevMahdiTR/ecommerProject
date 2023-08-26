import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Table, Tabs, Steps, DatePicker, Dropdown} from "antd";

import {
    addCategories,
    deleteCategories,
    getCategories, getSousCategories,
    updateCategories
} from "../../service/categories/categoriesService";
import {
    addArticlePhoto,
    addArticles,
    deleteArticles,
    getArticlesBuCategories, getArticlesBuCategoriesAdmin
} from "../../service/Articles/articlesServices";
import {addPromotion, deactivatePromotion, deletePromotion} from "../../service/promotions/promotionsService";
import moment from 'moment'; // Import moment here

const Articles = () => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [id, setId] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAddPhoto, setModalAddPhoto] = useState(false);
    const [modalPromotion, setModalPromotion] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [update, setUpdate] = useState(1)
    const [form] = Form.useForm();
    const [step, setStep] = useState(0);
    const [artImg, setArtImg] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoriesId, setSubCategoriesId] = useState([]);
    useEffect(()=>{
        getData()
    },[])
    useEffect(()=>{
        if (subCategories.length > 0 ){
            getArticles(subCategoriesId)
        }
    },[subCategoriesId])
    useEffect(()=>{
        if (id !== -1){
           getSubCategories()
        }
    },[id])

    const [article_id, setArticle_id] = useState(null);

    const handleEdit = (record)=>{
        setCurrentItem(record);
        setUpdate(prevState => prevState+1)
        setModalVisible(true);
    }
    const handlePromotion = (record)=>{
        setCurrentItem(record);
        setUpdate(prevState => prevState+1)
        setModalPromotion(true);
    }
    const handleActivateDeactivate = (record)=>{
        deactivatePromotion(record.promotion.id, {is_active: record.promotion.is_active !== 1}).then((res)=>{
            getData()
        })
    }
    const handleDeletePromotion = (record)=>{
        deletePromotion(record.promotion.id).then((res)=>{
            getData()
        })
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
            title:'Promotions',
            key: 'promotion',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    <p>{record.promotion ? record.promotion.value : 'no promotion'}</p>
                </div>
            )
        },
        {
            title:'Actions',
            key: 'actions',
            render: (_,record)=>(
                <div className={'flex gap-10'}>
                    <Button className={'bg-green-400 text-gray-50 border-0'}   onClick={()=>{handleEdit(record)}}>Edit</Button>
                    <Button className={'bg-red-400 text-gray-50 border-0'}  onClick={()=>{handleDelete(record)}}>Delete</Button>
                    <Button className={'bg-lime-700 text-gray-50 border-0'}  onClick={()=>{handleAddPhoto(record)}}>Add Photo</Button>
                    {!record.promotion && (
                        <Button className={'bg-cyan-950 text-gray-50 border-0'}  onClick={()=>{handlePromotion(record)}}>Add Articles to promotions</Button>
                    )}
                    {record.promotion && (
                        <>
                            <Button className={'bg-cyan-950 text-gray-50 border-0'}  onClick={()=>{handleActivateDeactivate(record)}}>
                                {record.promotion.is_active === 1 ? 'Deactivate' : 'activate'}
                            </Button>
                            <Button className={'bg-pink-900 text-gray-50 border-0'}  onClick={()=>{handleDeletePromotion(record)}}>
                                Delete Promotion
                            </Button>
                        </>

                    )}
                </div>
            )
        }
    ]

    const getData =  () => {
         getCategories().then(
                res =>{
                    setData(res.data.filter(item=>item.parent_id === null))
                    setId(res.data.filter(item=>item.parent_id === null)[0].id)

                })
    }
    const getSubCategories = ()=>{
        getSousCategories(id).then((res)=>{
             setSubCategories(res.data.sous_categories)
            setSubCategoriesId(res?.data?.sous_categories[0]?.id)
        })
    }
    const getArticles =  () => {
        getArticlesBuCategoriesAdmin(subCategoriesId).then(
                res =>{
                    console.log(res)
                    setTableData(res.data.articles)
                })
    }

    const onImageChange = (event) => {
            setArtImg(event.target.files[0])
    }
    const handleAddPhoto =(item)=>{
        setArticle_id(item.id);
        setModalAddPhoto(true)

    }
const handleSubmit2 = (value) => {
    const formData = new FormData();
    formData.append(
        'image',
        artImg,);
    formData.append('article_id',article_id);
    addArticlePhoto(formData).then(r=>{
        setModalAddPhoto(false);


    })
}
   const handleSubmit = (value)=>{
            addArticles({...value, 'category_id': subCategoriesId}).then(r=>{
                console.log(r)
                getArticlesBuCategoriesAdmin(subCategoriesId).then(
                    res =>{
                        console.log(res)
                        setTableData(res.data.articles)
                        setModalVisible(false);

                    })

            })

         setModalVisible(false);
        form.resetFields();
    }
   const handleSubmitPromotions = (value)=>{
       addPromotion({
           ...value,
           article_id: currentItem.id,
           started_date: value.started_date.format('YYYY/MM/DD'),
           finished_date: value.finished_date.format('YYYY/MM/DD'),
           type: 'article',
           is_active: true
       })
           .then((res)=>{
               getData()
       })

         setModalPromotion(false);
        form.resetFields();
    }

    const handleDelete =(record)=>{
        deleteArticles(record.id).then((res)=>{
            getData()
        })
    }

    const items = subCategories.map((item=>{
        return {
            key: item.id,
            label: (
                <a onClick={()=>{setSubCategoriesId(item.id)}}>
                    {item.name}
                </a>
            ),
        }
    }))
    return (
        <div className={'ServiceContainer'}>
            <Tabs
                tabPosition={'left'}
                onTabClick={(index)=> {
                    setId(index)
                }}
                items={data.map((item, index) => {
                    return {
                        index: index,
                        label: `${item.name}`,
                        key: item.id,
                        children: <>
                            <Button type={'default'} className={'bg-sky-400 text-gray-50 border-0 mr-9'}  onClick={()=>setModalVisible(true)}>
                                Add New Article
                            </Button>
                            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                <Button>select sub categories</Button>
                            </Dropdown>
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
                <Form form={form} onFinish={handleSubmit}  initialValues={currentItem}>
                    <Form.Item name="name" label="Name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="price" label="price" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="description" label="description" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="quarter" label="3 Mounth" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="semester" label="6 Mounth" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="threequarter" label="9 Mounth" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="annual" label="12 Mounth" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={'Add Photo'}
                open={modalAddPhoto}
                okType={"default"}
                onCancel={()=>{
                    setModalAddPhoto(false);
                    form.resetFields();
                }}
                onOk={()=> form.submit()}
            >
                <br/>
                <Form form={form} onFinish={handleSubmit2}  initialValues={currentItem}>
                    <Form.Item name="image" label="Image" rules={[{required: true, min: 7, message: 'min length is 7'}]}>
                        <input value={artImg} type="file" onChange={onImageChange}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={'Add Promotion'}
                open={modalPromotion}
                okType={"default"}
                onCancel={()=>{
                    setModalPromotion(false);
                    form.resetFields();
                }}
                onOk={()=> form.submit()}
            >
                <br/>
                <Form form={form} onFinish={handleSubmitPromotions}  initialValues={currentItem}>
                    <Form.Item name="value" label="New Price" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="started_date" label="start Date" rules={[{required: true}]}>
                        <DatePicker format={'YYYY/MM/DD'} />
                    </Form.Item>
                    <Form.Item name="finished_date" label="finished date" rules={[{required: true}]}>
                        <DatePicker format={'YYYY/MM/DD'} />
                    </Form.Item>

                </Form>
            </Modal>

        </div>
    );
};

export default Articles;
