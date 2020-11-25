import React, { Fragment } from 'react';

const RentList = (props) => {
     
    const reducer = (acc, item) => Number(acc) + Number(item.price);

    return (
        <Fragment>
            <div className="rent mb-5">
                <p className="title text-center text-sm-left">
                    &#129321; Your rent (Total: $
                    {
                        props.rentedBikes.length ? props.rentedBikes.reduce(reducer, 0) : 0
                    })
                </p>
                <Fragment>
                    {
                        props.rentedBikes.map(rentedBike => (                        
                            <Fragment key = {rentedBike.id}>
                                <div className="item p-4 p-sm-3 d-flex flex-column flex-sm-row">
                                    <p className="item__text">
                                    {rentedBike.name}   /   {rentedBike.type}   /   {"$"+rentedBike.price}
                                    </p>
                                    <button type="button" className="item__btn btn btn-danger mx-sm-3" onClick = {() => props.cancelRent(rentedBike.id, rentedBike.name, rentedBike.type, rentedBike.price)}>Cancel rent</button>
                                </div> 
                            </Fragment>
                        ))
                    }             
                </Fragment>
            </div>
        </Fragment>
    )
}

export default RentList;
