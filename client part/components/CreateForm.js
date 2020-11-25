import React, { Fragment, useState } from 'react';

const CreateForm = (props) => {

    const [name, setName] = useState('');
    const [type, setType] = useState('Choose type');
    const [price, setPrice] = useState('');

    const onSubmitRentForm = async(e) => {
        e.preventDefault();
        try {
            const body = { name, type, price };
            await fetch("http://localhost:5000/bikes",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.massage);
        }

        props.getBikes();
        setName('');
        setType('Choose type');
        setPrice('');
    }


    return (
        <Fragment>
            <h1 className="main-title text-center text-sm-left">
                Awesome Bike Rental
            </h1>
            <div className="create">
                <p className="title text-center text-sm-left">
                    &#129297; Create new rent
                </p>
                    <form  className="create__form p-4 p-sm-3 d-flex flex-column flex-sm-row" onSubmit= {onSubmitRentForm}>
                        <div className="form-group form__input mx-sm-3 mb-3 form-bigger">
                            <label htmlFor="exampleFormControlInput1">Bike name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Ex. Superbike"
                            value= {name}
                            onChange={ e => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group form__input mx-sm-3 mb-3 form-bigger">
                            <label htmlFor="exampleFormControlSelect1">Bike type</label>
                            <select className="form-control" id="exampleFormControlSelect1" value = {type} onChange={ e => setType(e.target.value)}>
                                <option>{type}</option>
                                <option>Mountain</option>
                                <option>Cyclocross</option>
                                <option>Road</option>
                            </select>
                        </div>
                        <div className="form-group form__input mx-sm-3 form-smaller">
                            <label htmlFor="exampleFormControlInput1">Rent Price</label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Ex. 10.00"
                            value= {price}
                            onChange={ e => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group form__input mx-sm-3 form-smaller"> 
                            <p className="input__title-btn">btn position</p>
                            <button type="submit" className="input__btn btn btn-success">Submit rent</button>
                        </div>
                    </form>  
                </div>                    
        </Fragment>
    )
}

export default CreateForm; 