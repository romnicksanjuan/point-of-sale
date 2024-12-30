import React, { useEffect, useState } from 'react'
import style from '../css/Main.module.css'

const Main = () => {
    // const [checkOut, setCheckOut] = ([{ name: '', qty: 1, subTotalPrice: 0 }])
    const [selectedItems, setSelectedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

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
        const pota = () => {
            console.log(selectedItems)
            // console.log('qty',quantity)
        }
        pota()
    }, [selectedItems])

    const handleAddQuantity = (id, item) => {
        // setQuantity(quantity + 1)
        // setTotalPrice(quantity * item.price)

        
        console.log(id)
        setSelectedItems(
            selectedItems.map((items) => id === items.id ? {...item, qty: items.qty + 1 } : items)
        )

        selectedItems.map((item) => {
            const qty = item.qty + 1
            const subTotal = qty * item.subTotalPrice
            console.log('namo', subTotal)
    
            console.log('qty', qty)
            setTotalPrice( subTotal + totalPrice )
        })

    }

    const items = [
        { id: 1, name: 'chicken', qty: 1, price: 25 },
        { id: 2, name: 'thigh', qty: 1, price: 20 },
        { id: 3, name: 'wings', qty: 1, price: 15 },
        { id: 4, name: 'neck', qty: 1, price: 10 },
        { id: 5, name: 'neck', qty: 1, price: 10 },
        { id: 6, name: 'neck', qty: 1, price: 10 },
    ]
    return (
        <div className={style.container}>
            {/* {items.map((item) => (
                <button key={item.id} onClick={() => handleItemClick(item)}>
                    {item.name} - {item.price}
                </button>
            ))} */}
            <div style={{ display: 'flex', width: '90%', margin: '0 auto', gap: '10px' }}>
                <div className={style.subContainer}>
                    {
                        items.map((item) => (
                            <div key={item.id} className={style.itemContainer} onClick={() => handleItemClick(item)}>
                                <h2>{item.name}</h2>
                                <h2>{item.price}</h2>
                            </div>
                        ))
                    }
                </div>
                <div className={style.sale}>
                    <h3 style={{ margin: '0', color: 'white', textAlign: 'center' }}>Checkout</h3>


                    <table className={style.styledTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>QTY</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td style={{ display: 'flex', gap: '5px', margin: '0', }}>
                                        <p style={{ margin: '0' }}>minus</p>
                                        <p style={{ margin: '0' }}>{item.qty}</p>
                                        <div style={{ backgroundColor: 'yellow', width: '100px', height: '40px' }} onClick={() => handleAddQuantity(item.id, item)}>
                                            <p style={{ margin: '0' }}>add</p>
                                        </div>
                                    </td>
                                    <td>{item.subTotalPrice * item.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>{totalPrice}</h2>
                </div>
            </div>


        </div>
    )
}

export default Main
