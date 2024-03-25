import React from 'react';
import classes from "./modal.module.css";
import Button from "../button/Button";
import List from "../list/List";
import Input from "../input/Input";

const Modal = ({handleShow, handleAdd,onChangeInput}) => {

    return (
        <div>
            <div className={classes.modalWrapper}></div>
            <div className={classes.modalContent}>
                <Button onClick={handleShow} label={'x'} />
                {/*<List/>*/}
                <Input type={'text'} placeholder={'add task'} onChangeInput={onChangeInput}/>
                <Button label={'Add'} onClick={handleAdd}/>
            </div>
        </div>
    )
}

export default Modal