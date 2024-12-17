import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import './AddInventory.css'; // Import custom CSS file for styling
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';

function AddInventory() {
    const [formData, setFormData] = useState({});

    const [clothTypes, setClothTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [filex, setFilex] = useState()
    const [imgUrl, setImgUrl] = useState('')
    
    const [nxt, setNxt] = useState(false)
    const [colorData, setColorData] = useState([])

    const [color, setColor] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [qty, setQty] = useState(0)

    //img upd
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});

    const [errMsgOne, setErrMsgOne] = useState('');
    const [errMsgColor, setErrMsgColor] = useState('');

    useEffect(()=>{console.log(colorData)},[colorData])
    useEffect(()=>{console.log(formData)},[formData])

    useEffect(() => {
        //console.log('fun executed')
        if(imgUrl.length && formData.age.length && formData.clothType.length && formData.date.length && formData.desc.length && formData.gender.length && formData.img.length && formData.price.length && formData.supplier.length && formData.fullDesc.length) {
            //console.log('Img received')
            axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/add', formData)
            .then(res => {
                console.log(res)
                setError('')
                setSuccess('Inventory added successfully.')
                setNxt(false)
                setFormData({
                    age:"",
                    clothType:"",
                    date: "",
                    desc: "",
                    gender: "",
                    img: "",
                    price: "",
                    supplier: "",
                    fullDesc: ""
                })
                setColor({color: ''})
                setColorCode({colorCode: ''})
                setQty({qty: ''})
                setColor('')
                setColorCode('')
                setQty('')
                setColorData([])
                //setColorData({color: '', colorCode: '', qty: ''})
            })
            .catch(err => console.log(err))
        }

    }, [imgUrl])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/suppliers');
                setSuppliers(response.data);
                const types = response.data.map(supplier => supplier.clothType);
                const uniqueTypes = [...new Set(types)];
                setClothTypes(uniqueTypes);
            } catch (error) {
                console.error('Error fetching cloth types:', error);
                setError('Failed to fetch cloth types. Please try again.');
            }
        };

        fetchData();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        console.log({ ...formData, [name]: value })

        if (name === 'clothType') {
            const filtered = suppliers.filter(supplier => supplier.clothType === value);
            setFilteredSuppliers(filtered);
        }
    };

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const currentDate = new Date().toISOString().split('T')[0];
        try {
            //const updatedFormData = { ...formData, lastUpdated: currentDate };
            
            const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/inventory', formData);
            console.log(response.data);
            setSuccess('Inventory added successfully.');
            setError('');
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message === 'Cloth ID already exists') {
                setError('Cloth ID already exists. Please enter a different Cloth ID.');
            } else {
                setError('An error occurred. Please try again later.');
            }
            setSuccess('');
        }
    };


    const handleSubmitNn = (e) => {
        e.preventDefault()



        //const reader = new FileReader()
//
        //reader.readAsDataURL(filex)
  //
        //reader.onload = () => {
        //  axios.post(process.env.REACT_APP_API_HOST + '/api/upload', {img: reader.result})
        //  .then(res => {
        //    if(res.data.result.url !== '') {
        //        //console.log(res.data.result.url)
        //        setFormData({ ...formData, ["img"]: res.data.result.url, ["colorData"]: colorData })
        //        setImgUrl(res.data.result.url)
//
        //    }
        //  })
        //  .catch(err => {
        //    setSuccess('')
        //    setError('An error occurred. Please try again later.')
        //})
        //}

    }

    const addColorData = (e) => {
        const { name, value } = e.target;
        setColorData( [...colorData, {[name]: value}]);
    }    
    
    const addColors = () => {

        if(!color || !colorCode || !qty) return setErrMsgColor("Please add color data and qty")
        setErrMsgColor("")
        setColorData([...colorData, {["color"]: color, ["code"]: colorCode, ["qty"]: qty}]);
        setColor({color: ''})
        setColorCode({colorCode: ''})
        setQty({qty: ''})
        setColor('')
        setColorCode('')
        setQty('')
    }

    const handleSelectFile = (e) => setFile(e.target.files[0]);
    const handleSubmitN = async(e) => {
        e.preventDefault()

        if(!colorData.length) return setErrMsgColor("Add colors")
          setLoading(true);
          const data = new FormData();
          data.append("my_file", file);

          axios.post("http://localhost:3001/upload", data)
          .then(res => {
            console.log(res.data.secure_url);
            if(res.data.secure_url !== '') {
                setFormData({ ...formData, ["img"]: res.data.secure_url, ["colorData"]: colorData })
                setImgUrl(res.data.secure_url)
            }
          })
          .catch(error => alert(error.message))
          

          setLoading(false);
        
      }

      const validate = (e) => {
//loading && formData.age && formData.clothType && formData.date && formData.desc && formData.gender && formData.img && formData.price && formData.supplier && formData.fullDesc
        if(file && formData.age && formData.clothType && formData.date && formData.desc && formData.gender && formData.price && formData.price && formData.supplier && formData.fullDesc){
            setErrMsgOne("")
            setNxt(true)
        }else {
            setErrMsgOne("Please fill all the fields")
        }
        
      }

    return (
        <>
        <div className="mng-nav">
          <InventoryStockSupplierManHeaderN/>
        </div>
        <div className="mng-head">
            <h2 className="heading">Add Inventory</h2>
        </div>
        <div className="MngF-container">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmitN}>
                    {!nxt ? <>
                        <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="desc">
                                    <Form.Label>Headline</Form.Label>
                                    <Form.Control type="text" name="desc" value={formData.desc} onChange={handleChange} placeholder="Enter Headline" required className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="fullDesc">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="fullDesc" value={formData.fullDesc} onChange={handleChange} placeholder="Enter Full Description" required className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="img">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" name="img" onChange={handleSelectFile}  required className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                
                            <Form.Group controlId="clothType">
                                <Form.Label>Cloth Type</Form.Label>
                                <Form.Select name="clothType" value={formData.clothType} onChange={handleChange} required className="custom-select">
                                    <option value="">Cloth type</option>
                                    <option value="Blouse">Blouse</option>
                                    <option value="Skirt">Skirt</option>
                                    <option value="Frock">Frock</option>
                                    <option value="nightie">nightie</option>
                                    <option value="Jacket">Jacket</option>
                                    <option value="Shorts">Shorts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="T-shirt">T-shirt</option>
                                    <option value="Coat">Coat</option>

                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="gender">
                                <Form.Label>Suitable Gender</Form.Label>
                                <Form.Select name="gender" value={formData.gender} onChange={handleChange} required className="custom-select">
                                    <option value="">Suitable Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="age">
                                <Form.Label>Suitable Age</Form.Label>
                                <Form.Select name="age" value={formData.age} onChange={handleChange} required className="custom-select">
                                    <option value="">Suitable Age</option>
                                    <option value="Kids">Kids -- 5-12</option>
                                    <option value="Teenagers">Teenagers -- 13-19</option>
                                    <option value="Youngers">Youngers -- 20-29</option>
                                    <option value="Young Upper">Young Upper -- 30-39</option>
                                    <option value="Middlers">Middlers -- 40-49</option>
                                    <option value="Middle Upper">Middle Upper -- 50-69</option>
                                    <option value="Old Above">Old Above -- 70</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="supplier">
                                <Form.Label>Supplier</Form.Label>
                                <Form.Select name="supplier" value={formData.supplier} onChange={handleChange} required className="custom-select">
                                    <option value="">Supplier</option>
                                    {suppliers.map((sup) => {
                                        return <option key={sup._id} value={sup.supplierName}>{sup.supplierName}</option>
                                    })}

                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Enter Price" required className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required className="custom-text-input" max={new Date().toJSON().slice(0, 10)}/>
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                    <p style={{color: "red"}}>{errMsgOne}</p>
                    <Row className="mb-4">
                        <Col className="text-center"> {/* Center the content */}
                        <Button variant="primary" onClick={validate} className="float-end">
                            Next
                        </Button>
                        </Col>
                    </Row>
                    </> : <>
                    <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="color">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="text" name="color" value={color}  onChange={(e) => setColor(e.target.value)} placeholder="Enter Color"  className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>



                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="colorCode">
                                    <Form.Label>Color Code</Form.Label>
                                    <Form.Control type="text" name="colorCode" value={colorCode}  onChange={(e) => setColorCode(e.target.value)} placeholder="Enter Color Code"  className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="qty">
                                    <Form.Label>Qty</Form.Label>
                                    <Form.Control type="text" name="qty" value={qty}  onChange={(e) => setQty(e.target.value)} placeholder="Enter Quentity"  className="custom-text-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                        

                        
                    </Row>
                    <Row className="mb-4">
                        <Col className="text-center"> {/* Center the content */}
                            <Button variant="primary" onClick={addColors}  className="custom-submit-btn">
                                Add Color
                            </Button>
                        </Col>
                    </Row>
                    <p style={{color: "red"}}>{errMsgColor}</p>
                    <Row className="mb-4">
                        <Col className="text-center"> {/* Center the content */}
                        
                            <Button variant="primary" type="submit" className="float-end mr-5">
                                Add Inventory
                            </Button>
                            <Button variant="primary" onClick={()=>setNxt(false)} className="float-end">
                                Back
                            </Button>
                        </Col>
                    </Row>
                    
                    </>}
                </Form>
            </div>
        </>
    );
}

export default AddInventory;