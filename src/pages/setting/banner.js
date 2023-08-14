import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Table, Upload} from "antd";
import {addOrUpdate, getBanners} from "../../service/banners/bannersService";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {addArticlePhoto} from "../../service/Articles/articlesServices";

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [update, setUpdate] = useState(1)
    const [artImg, setArtImg] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleEdit = (record)=>{
        setCurrentItem(record);
        setImageUrl(record.url);
        setUpdate(prevState => prevState+1)
        setModalVisible(true);
    }
    const handleSubmit2 = (value) => {
        const formData = new FormData();
        formData.append(
            'image',
            artImg,);
        formData.append('type',currentItem.type ? currentItem.type : `banner${(banners?.length+1).toString()}`);
        addOrUpdate(formData).then(r=>{
            console.log(r.data)
            setModalVisible(false);
            getBanners().then(r => {
                setBanners(r.data)
            })

        })
    }

    useEffect(()=>{
      getBanners().then(res => {
            setBanners(res.data)
      })
    }, [])

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{marginTop: 8}}>
                Upload
            </div>
        </div>
    );

    const columns = [
        {
            title:'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'image',
           render: (_, record) => (
                <img src={record.url} alt={record.type} width={100} height={100}/>
            ),
            key: 'image'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className={'flex gap-10'}>
                    <Button
                        className={'bg-green-400 text-gray-50 border-0'}
                        onClick={() => {handleEdit(record)}}>
                        Edit
                    </Button>
                </div>
            )}
    ]
    const onImageChange = (event) => {
        setArtImg(event.target.files[0])
    }
    return (
        <div className={'ServiceContainer'}>
            {banners.length < 4?
            <Button
                type={'default'}
                className={'bg-sky-400 text-gray-50 border-0'}
                onClick={() => setModalVisible(true)}>
                Add Banner
            </Button>
                :null
            }
            <br/>
            <Table bordered={true} dataSource={banners} columns={columns}/>
            <Modal
                title={currentItem.id ? 'Update Banner' : 'Add Banner'}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false)
                    form.resetFields();
                }}
                okType={'default'}
                onOk={() => {
                    form.submit();
                }}
                >
                <Form form={form} onFinish={handleSubmit2}  initialValues={currentItem}>
                    <Form.Item name="image" label="Image" rules={[{required: true, min: 7, message: 'min length is 7'}]}>
                        <input value={artImg} type="file" onChange={onImageChange}/>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    );
};

export default Banner;
