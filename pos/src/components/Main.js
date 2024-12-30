import React, { useEffect, useState } from 'react';
import style from '../css/Main.module.css';

import classic_milktea from '../images/classic-milktea.png'
import darkchoco_milktea from '../images/darkchocolate-milktea.png'
import matcha_milktea from '../images/matcha-milktea.png'
import taro_milktea from '../images/taro-milktea.png'
import winter_melon_milktea from '../images/wintermelon-milktea.png'

// icons
import { GoPlus, GoMinus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const originalItems = [
    { id: 1, name: 'Classic', price: 25, image: classic_milktea },
    { id: 2, name: 'Dark Chocolate', price: 20, image: darkchoco_milktea },
    { id: 3, name: 'Matcha', price: 15, image: matcha_milktea },
    { id: 4, name: 'Taro', price: 10, image: taro_milktea },
    { id: 5, name: 'Winter Melon', price: 10, image: winter_melon_milktea },
    { id: 6, name: 'Classic', price: 25, image: classic_milktea },
    { id: 7, name: 'Dark Chocolate', price: 20, image: darkchoco_milktea },
    { id: 8, name: 'Matcha', price: 15, image: matcha_milktea },
    { id: 9, name: 'Taro', price: 10, image: taro_milktea },
    { id: 10, name: 'Winter Melon', price: 10, image: winter_melon_milktea },]

const Main = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [search, setSearch] = useState('')
    const [items, setItems] = useState(originalItems)
    const [payment, setPayment] = useState('')
    const [change, setChange] = useState(0)

    const handleItemClick = (item) => {
        const existingItem = selectedItems.find(selected => selected.id === item.id);
        if (existingItem) {
            setSelectedItems(selectedItems.map(selected =>
                selected.id === item.id
                    ? { ...selected, qty: selected.qty + 1 }
                    : selected
            ));
        } else {
            setSelectedItems([...selectedItems, { ...item, qty: 1 }]);
        }

    };

    useEffect(() => {
        const calculateTotalPrice = () => {

            console.log(selectedItems)

            let totalPrice = 0;
            for (let i = 0; i < selectedItems.length; i++) {
                totalPrice += selectedItems[i].price * selectedItems[i].qty;
            }
            // console.log(totalPrice);
            // console.log(t.length + t)
            // const total = selectedItems.reduce((acc, item) => acc + item.qty * item.price, 0);
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [selectedItems]);

    // add
    const handleAddQuantity = (id) => {
        setSelectedItems(selectedItems.map(item =>
            item.id === id
                ? { ...item, qty: item.qty + 1 }
                : item
        ));
    };

    // minus
    const handleMinusQuantity = (items) => {
        const minus = selectedItems.map(item =>
            item.id === items.id
                ? { ...item, qty: item.qty <= 1 ? 1 : item.qty - 1 }
                : item
        )



        // console.log(min)
        setSelectedItems(minus);

    };

    // delete
    const deleteSelectedItem = (item) => {
        setSelectedItems(selectedItems.filter(selected => (selected.id !== item.id)))
    }

    // search
    const searchItem = () => {
        setItems(originalItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
    }

    useEffect(() => {
        const s = () => {
            if (search === '') {
                setItems(originalItems)
            }
        }
        s()
    }, [search])

    // calculate
    const calculate = () => {
        setChange(totalPrice > payment ? alert("Please provide highier amount") : payment - totalPrice)
    }

    return (
        <div className={style.container}>

            <div style={{ display: 'flex', width: '90%', margin: '0 auto', padding: '20px', gap: '30px', height: '700px', }}>

                <div className={style.itemsContainer} style={{ padding: '20px 0 0 0', borderRadius: '10px', width: '100%', border: '1px solid gray', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',overflowY: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 20px 0' }}>
                        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Item'
                            style={{ height: '35px', width: '240px', borderRadius: '5px', padding: '5px', margin: '0 20px 0 30px' }} />
                        <button style={{ height: '40px', width: '40px', borderRadius: '50%', margin: '0' }} onClick={() => searchItem()}>
                            <IoSearch size={20} color='green' />
                        </button>
                    </div>


                    <div className={style.subContainer}>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={style.itemContainer}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className={style.imgContainer}>
                                    <img src={item.image} style={{ width: '100%', height: 'auto', }}></img>
                                </div>
                                <p style={{ textAlign: 'center', margin: '5px', fontSize: '16px', fontWeight: 'bold', color: 'white', }}>{item.name}</p>
                                <p style={{ textAlign: 'center', margin: '0', fontSize: '16px', fontWeight: 'bold', color: 'white' }}>P{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className={style.sale}>
                        <h3 style={{ margin: '10px 0 0 0', color: 'black', textAlign: 'center' }}>Checkout</h3>
                        <table className={style.styledTable}>
                            <thead>
                                <tr>
                                    <th style={{ width: '150px', color: 'white' }}>Name</th>
                                    <th style={{ width: '120px', color: 'white' }} >QTY</th>
                                    <th style={{ width: '120px', color: 'white' }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map((item) => (

                                    <tr key={item.id}>

                                        <td >
                                            <div style={{ width: '150px', display: 'flex', alignItems: 'center' }} onClick={() => deleteSelectedItem(item)}>
                                                <MdDeleteOutline size={24} color='#009879' />
                                                <p>{item.name}</p>
                                            </div>

                                        </td>
                                        <td style={{ width: '120px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '30px', position: 'relative' }}>
                                                <div
                                                    style={{
                                                        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px', cursor: 'pointer',
                                                        borderRadius: '50%', border: '2px solid #009879', position: 'absolute', left: '5px'
                                                    }}
                                                    onClick={() => handleMinusQuantity(item)}
                                                >
                                                    <HiMiniMinusSmall color='#009879' />
                                                </div>

                                                <p style={{ margin: '0 ', width: 'auto' }}>{item.qty}</p>

                                                <div
                                                    style={{
                                                        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px',
                                                        height: '25px', cursor: 'pointer', borderRadius: '50%', border: '2px solid #009879', position: 'absolute', right: '5px', margin: '0'
                                                    }}
                                                    onClick={() => handleAddQuantity(item.id)}
                                                >
                                                    <GoPlus color='#009879' />
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>{item.qty * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style.total}>
                            <h2 style={{ marginLeft: '10px', }}>TOTAL:</h2>
                            <h2 style={{ marginRight: '10px', }}>P{totalPrice}</h2>
                        </div>
                    </div>

                    <div style={{ margin: '0', backgroundColor: 'white', height: '140px', borderRadius: '10px', marginTop: '10px', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', border: '1px solid gray' }}>
                        <h4 style={{ margin: '20px 0 5px 20px', padding: '5px 0 0 0' }}>
                            PAYMENT
                        </h4>

                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <input type='number' placeholder='Enter Amount' value={payment} onChange={(e) => setPayment(e.target.value)}
                                style={{ height: '40px', width: '150px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', margin: '0 0 0 20px' }} />
                            <button className={style.payButton} onClick={() => calculate()}>PAY</button>
                        </div>
                        <h4 style={{ margin: '5px 0 5px 20px' }}>CHANGE: {change}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
