import React, { Fragment } from 'react';


const AvailableList = (props) => {
    return(
        <Fragment>
            <div className="available">
                <p className="title text-center text-sm-left">
                    &#128690; Available bicycles ({props.bikes.length ? props.bikes.length : 0})
                </p>
                <Fragment>
                {
                    props.bikes.map(bike => (                      
                        <Fragment key={bike.id}>
                            <div className="item p-4 p-sm-3 d-flex flex-column flex-sm-row">
                                    <p className="item__text text-available">
                                        { bike.name } / { bike.type } / {"$ "+ bike.price}
                                    </p>
                                    <button type="button" className="item__btn btn btn-primary mx-sm-3" onClick = {() => props.rentBike(bike.id, bike.name, bike.type, bike.price)}>Rent</button>
                                    <button type="button" className="item__btn btn btn-danger mx-sm-3" onClick={() => props.deleteBike(bike.id)}>Delete</button>
                            </div>
                        </Fragment>  
                    ))
                }
                </Fragment>
            </div>
        </Fragment>
    )
}

export default AvailableList;