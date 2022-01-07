import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
// import Admin from '../Home/Admin/Admin';


import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './Billpage.css'
import { UserContext } from '../../App';
// import useAuth from '../../../hooks/useAuth';
// import "./Admin.css";

const BillPage = () => {
    // const { user } = useAuth();
    const [bills, setBills] = useState([]);
    const [displayBills, setdisplayBills] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const size = 10;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`https://desco-task.herokuapp.com/billing-list?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBills(data.bills);
                setdisplayBills(data.bills);
                const count = parseInt(data.count);
                const pageNumber = Math.ceil(count / size);
                console.log(pageNumber);
                console.log(...Array(pageCount).keys());
                setPageCount(pageNumber);
            });
    }, [page, loading]);

    const handleNameSearch = e => {
        const searchName = e.target.value;

        const matchedBills = bills.filter(bill => bill.name.toLowerCase().includes(searchName.toLowerCase()) || bill.phone.toLowerCase().includes(searchName.toLowerCase()) || bill.email.toLowerCase().includes(searchName.toLowerCase()));

        setdisplayBills(matchedBills);
    }

    const onSubmit = data => {
        console.log(data)
        setLoading(true)

        fetch('https://desco-task.herokuapp.com/api/add-billing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    setLoading(false)
                    alert("Insertion successful")
                }
            })
    }


    const handleDelete = (id) => {
        fetch(`https://desco-task.herokuapp.com/delete-billing/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                alert('One bill deleted.')
            })
    }
    return (
        <div>
            <Header></Header>

            <div className='admin-container'>


                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Add a new bill
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <input type="email" placeholder='Email' value={loggedInUser?.email} {...register("email", { required: true })} />{errors.email && <span className='text-danger fw-bold'>This field is required</span>}
                                            <input type="text" placeholder='Name' value={loggedInUser?.name} {...register("name", { required: true })} />
                                            {errors.name && <span className='text-danger fw-bold'>This field is required</span>}
                                            <input type="text" placeholder='Phone' {...register("phone", { required: true })} />
                                            {errors.phone && <span className='text-danger fw-bold'>This field is required</span>}
                                            <input type="text" placeholder='Paid Amount' {...register("amount", { required: true })} />
                                            {errors.amount && <span className='text-danger fw-bold'>This field is required</span>}
                                            <input type="submit" />
                                        </form>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <form class="d-flex">
                            <input type="text" placeholder='Search by Name, Email or Phone Number' onChange={handleNameSearch}/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                        <input type="text" placeholder='Search by Name, Email or Phone Number' onChange={handleNameSearch} className='search-input' />

                    </div>
                </nav>



                {/* <input type="text" placeholder='Search by Name, Email or Phone Number' onChange={handleNameSearch}/> */}

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    {
                        displayBills.map(bill =>
                            <tbody key={bill._id}>
                                <tr>
                                    <td>{bill._id}</td>
                                    <td>{bill.name}</td>
                                    <td>{bill.email}</td>
                                    <td>{bill.phone}</td>
                                    <td>{bill.paidAmount}</td>
                                    <td><span className='btn btn-success' >Edit</span> | <span className='btn btn-danger' onClick={() => handleDelete(bill._id)}>Delete</span></td>
                                </tr>
                            </tbody>)
                    }
                </Table>
                {loading && <div className="d-flex justify-content-center mt-5 mb-5">
                    <Table>
                        <tbody>
                            <tr>
                                <td>Generating ID</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>}
                <p className='text-center mt-5'>Page No --</p>
                <div className="pagination  d-flex justify-content-center">

                    <div>
                        {
                            [...Array(pageCount).keys()].map(number =>
                                <button
                                    key={number}
                                    onClick={() => setPage(number)}
                                    className={number === page ? 'btn btn-primary' : 'btn'}
                                >{number}</button>
                            )
                        }
                    </div>
                </div>
            </div>


















        </div>
    );
};

export default BillPage;